const Task = require("../models/Task.js");

const normalizeTaskStatus = (value) => {
    if (value === undefined || value === null) return undefined;

    const raw = String(value).trim();
    if (!raw) return undefined;

    // Accept common variants from clients/DB: "In Progress", "In_Progress", "in-progress", etc.
    // We normalize by removing spaces/underscores/hyphens.
    const normalized = raw.toLowerCase().replace(/[\s_-]+/g, "");

    if (normalized === "pending") return "Pending";
    if (normalized === "inprogress") return "In_Progress";
    if (normalized === "completed" || normalized === "complete") return "Completed";

    return null;
};

// Convert DB status (In_Progress) to display format (In Progress) for frontend
const formatStatusForDisplay = (status) => {
    if (status === "In_Progress") return "In Progress";
    return status;
};

const normalizeBoolean = (value) => {
    if (typeof value === "boolean") return value;
    if (typeof value === "number") return value !== 0;
    if (typeof value === "string") {
        const normalized = value.trim().toLowerCase();
        if (["true", "1", "yes", "y"].includes(normalized)) return true;
        if (["false", "0", "no", "n"].includes(normalized)) return false;
    }
    return false;
};

const normalizeTodoChecklist = (value) => {
    if (!Array.isArray(value)) return value;

    return value
        .map((item) => {
            if (typeof item === "string") {
                return { text: item, completed: false };
            }
            if (!item || typeof item !== "object") return null;

            const text = item.text ?? item.title ?? item.label;
            if (!text) return null;

            const completed =
                item.completed ?? item.Completed ?? item.done ?? item.isCompleted ?? false;

            return {
                text,
                completed: normalizeBoolean(completed),
            };
        })
        .filter(Boolean);
};

const getTasks = async(req , res) => {

    try {
        const { status } = req.query;
        const filter = {};

        if (status) {
            const normalizedStatus = normalizeTaskStatus(status);
            if (!normalizedStatus) {
                return res.status(400).json({
                    message: "Invalid status value",
                    allowed: ["Pending", "In_Progress", "Completed"],
                });
            }
            filter.status = normalizedStatus;
        }

        let tasks;

        if (req.user.role == "admin") {
            tasks = await Task.find(filter).populate(
                "assignedTo",
                "name email profileImageUrl"
            );
        } else {
            tasks = await Task.find({ ...filter, assignedTo: req.user._id }).populate(
                "assignedTo",
                "name email profileImageUrl"
            );
        }

        tasks = tasks.map((task) => {
            const checklist = Array.isArray(task.todoChecklist) ? task.todoChecklist : [];
            const completedCount = checklist.filter((item) => item.completed).length;
            const totalItems = checklist.length;
            const progress = totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;
            return {
                ...task._doc,
                status: formatStatusForDisplay(task.status),
                completedTodoCount: completedCount,
                progress: progress,
            };
        });


        const roleFilter = req.user.role === "admin" ? {} : { assignedTo: req.user._id };

        const allTasks = await Task.countDocuments({ ...roleFilter });

        const pendingTasks = await Task.countDocuments({
            ...roleFilter,
            status: "Pending",
        });

        const inProgressTasks = await Task.countDocuments({
            ...roleFilter,
            status: "In_Progress",
        });

        const completedTasks = await Task.countDocuments({
            ...roleFilter,
            status: "Completed",
        });
        
        return res.status(200).json({
            tasks,
            statusSummary: {
                all: allTasks,
                Pending: pendingTasks,
                InProgress: inProgressTasks,
                Completed: completedTasks,
            },
        });
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
}

const getDashboardData = async(req , res) => {

    try {
        const totalTasks  = await Task.countDocuments();
        const pendingTasks = await Task.countDocuments({ status: "Pending" });
        const completedTasks = await Task.countDocuments({ status: "Completed" });
        const overdueTask  = await Task.countDocuments({
            status: { $ne: "Completed" },
            dueDate: { $lt: new Date() },
        });
        const taskStatuses = ["Pending", "In_Progress", "Completed"];
        const taskDistributionRaw = await Task.aggregate([
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 },
                },
            },
        ]);

        const taskDistribution = taskStatuses.reduce((acc , status) => {
            const formattedKey = status.replace(/\s+/g,"")
            acc[formattedKey] = 
            taskDistributionRaw.find((item)=> item._id === status)?.count || 0;
            return acc;
        },{});
        taskDistribution["All"] = totalTasks;

        const taskPriorities  = ["Low" , "Medium" , "High"];
        const taskPriorityLevelRaw = await Task.aggregate([
            {
                $group : {
                    _id : "$priority",
                    count : {$sum : 1},
                },
            },
        ]);
        const taskPriorityLevels = taskPriorities.reduce((acc , priority) => {
            acc[priority] = 
                taskPriorityLevelRaw.find((item) => item._id == priority)?.count || 0;
                return acc;
        } ,{});

        const recentTask = await Task.find()
            .sort({createdAt : -1})
            .limit(10)
            .select("title status priority dueDate createdAt");

            res.status(200).json({
                statistics :{
                    totalTasks,
                    pendingTasks,
                    completedTasks,
                    overdueTask,
                },
                charts :{
                    taskDistribution,
                    taskPriorityLevels,

                },
                recentTask,

            })
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
}

const getUserDashboardData = async(req , res) => {
    try {
        const userId = req.user._id;

        const totalTasks = await Task.countDocuments({ assignedTo: userId });
        const pendingTasks = await Task.countDocuments({ assignedTo: userId, status: "Pending" });
        const completedTasks = await Task.countDocuments({ assignedTo: userId, status: "Completed" });
        const overdueTask = await Task.countDocuments({
            assignedTo:userId,
            status : {$ne: "Completed"},
            dueDate : {$lt : new Date()},
        });

        const taskStatuses = ["Pending" , "In_Progress" , "Completed" ];
        const taskDistributionRaw = await Task.aggregate([
            {$match : {assignedTo : userId}},
            {$group : {_id:"$status" , count: {$sum : 1}}},
        ]);

        const taskDistribution = taskStatuses.reduce((acc , status) => {
        const formattedKey = status.replace(/\s+/g,"")
            acc[formattedKey] = 
            taskDistributionRaw.find((item)=> item._id === status)?.count || 0;
            return acc;
        },{});
        taskDistribution["All"] = totalTasks;


        const taskPriorities = ["Low" , "Medium" , "High"];
        const taskPriorityLevelRaw = await Task.aggregate([
            {$match : {assignedTo :userId}},
            {$group : {_id : "$priority" , count :{$sum :1 }}}, 
        ]) ;
        
        const taskPriorityLevels = taskPriorities.reduce((acc , priority) => {
            acc[priority] = 
            taskPriorityLevelRaw.find((item) => item._id === priority)?.count || 0;
            return acc;
        } , {});

        const recentTask = await Task.find({assignedTo : userId})
            .sort({createdAt : -1})
            .limit(10)
            .select("title status priority dueDate createdAt");
            
            res.status(200).json({
            statistics: {
                totalTasks,
                pendingTasks,
                completedTasks,
                overdueTask,
            },
            charts: {
                taskDistribution,
                taskPriorityLevels,
            },
            recentTask,
        });


    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
}

const getTaskbyId = async(req , res) => {

    try {
        const task = await Task.findById(req.params.id).populate(
            "assignedTo",
            "name email profileImageUrl"
        );

        if (!task) return res.status(404).json({ message: "Task not Found" });

        return res.status(200).json({
            ...task._doc,
            status: formatStatusForDisplay(task.status),
        });
    } catch (error){
        return res.status(500).json({message : "Server Error" , error : error.message});
    }
}

const createTask = async(req , res) => {
    try{
        const {
            title, 
            description,
            priority,
            status,
            dueDate,
            assignedTo,
            attachments,
            todoChecklist,
            todoCheckList,
        } = req.body;
        
        // Accept both todoChecklist and todoCheckList for backward compatibility
        const checklist = todoChecklist || todoCheckList;
        
        if(!Array.isArray(assignedTo)){
            return res
            .status(400)
            .json({message : "Assigned To must be an array of User Id "});

        }

        const normalizedStatus = normalizeTaskStatus(status);
        if (status !== undefined && !normalizedStatus) {
            return res.status(400).json({
                message: "Invalid status value",
                allowed: ["Pending", "In_Progress", "Completed"],
            });
        }

        const task = await Task.create({
            title,
            description,
            priority,
            ...(normalizedStatus ? { status: normalizedStatus } : {}),
            dueDate,
            assignedTo,
            createdBy : req.user._id,
            todoChecklist: normalizeTodoChecklist(checklist),
            attachments,

        });

        res.status(201).json({
            message: "Task Created Succesfully",
            task: { ...task._doc, status: formatStatusForDisplay(task.status) }
        });
    } catch (error){
        res.status(500).json({message : "Server Error" , error : error.message});
    }
}

const updateTask = async(req , res) => {
    try {
        const task  = await Task.findById(req.params.id);
        if(!task) return res.status(404).json({message : "Task Not Found"});

        task.title = req.body.title || task.title;
        task.description = req.body.description || task.description ;
        task.priority = req.body.priority || task.priority; 
        task.dueDate = req.body.dueDate || task.dueDate;
        
        // Accept both todoChecklist and todoCheckList for backward compatibility
        const checklist = req.body.todoChecklist ?? req.body.todoCheckList;
        if (checklist !== undefined) {
            task.todoChecklist = normalizeTodoChecklist(checklist);
        }
        task.attachments = req.body.attachments || task.attachments;

        if (req.body.status !== undefined) {
            const normalizedStatus = normalizeTaskStatus(req.body.status);
            if (!normalizedStatus) {
                return res.status(400).json({
                    message: "Invalid status value",
                    allowed: ["Pending", "In_Progress", "Completed"],
                });
            }
            task.status = normalizedStatus;
        }

        if(req.body.assignedTo){
            if(!Array.isArray(req.body.assignedTo)){
                return res
                .status(400)
                .json({message :"Assignedto Must be an Array of User IDs"});
            }

            task.assignedTo = req.body.assignedTo;
        }

        await task.save();
        return res.status(200).json({
            message: "Task updated successfully",
            task: { ...task._doc, status: formatStatusForDisplay(task.status) }
        });
    } catch (error){
        return res.status(500).json({message : "Server Error" , error : error.message});
    }
};


const deleteTask = async(req , res) => {

    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: "Task Not Found" });

        await task.deleteOne();
        return res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
}

const updateTaskStatus = async(req , res) => {
    try {
        const task = await Task.findById(req.params.id);
        if(!task) return res.status(404).json({message : "Task Not Found"});

        const assignedToList = Array.isArray(task.assignedTo) ? task.assignedTo : [];
        const isAssigned = assignedToList.some(
            (userId) => userId.toString() === req.user._id.toString()
        );

        if(!isAssigned && req.user.role !== 'admin'){
            return res.status(403).json({message : "Not authorized"});
        }

        if (req.body.status !== undefined) {
            const normalizedStatus = normalizeTaskStatus(req.body.status);
            if (!normalizedStatus) {
                return res.status(400).json({
                    message: "Invalid status value",
                    allowed: ["Pending", "In_Progress", "Completed"],
                });
            }
            task.status = normalizedStatus;
        }

        if (task.status === "Completed") {
            const checklist = Array.isArray(task.todoChecklist) ? task.todoChecklist : [];
            checklist.forEach((item) => (item.completed = true));
            task.progress = 100;
        }

        await task.save();
        res.json({
            message: "Task status updated",
            task: { ...task._doc, status: formatStatusForDisplay(task.status) }
        });
    } catch (error){
        return res.status(500).json({message : "Server Error " , error : error.message});
    }
};

const updateTaskChecklist = async(req , res) => {

    try {
        // Accept both todoChecklist and todoCheckList for backward compatibility
        const todoChecklist = req.body.todoChecklist ?? req.body.todoCheckList;
        const task  = await Task.findById(req.params.id);

        if(!task) return res.status(404).json({message : "Task Not Found"});
        const assignedToList = Array.isArray(task.assignedTo) ? task.assignedTo : [];
        const isAssigned = assignedToList.some(
            (userId) => userId.toString() === req.user._id.toString()
        );
        if(!isAssigned && req.user.role != "admin"){
            return res
                .status(403)
                .json({message : "Not Authorized to update Checklist"});
        }

        task.todoChecklist  = normalizeTodoChecklist(todoChecklist);
        const completedCount = task.todoChecklist.filter(
            (item) => item.completed
        ) .length;
        const totalItems = task.todoChecklist.length;
        task.progress = totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;

        if(task.progress === 100){
            task.status = "Completed";
        } else if(task.progress > 0){
            task.status = "In_Progress";
        } else {
            task.status = "Pending";
        }
        await task.save();
        const updatedTask  = await Task.findById(req.params.id).populate(
            "assignedTo",
            "name email profileImageUrl"
        );

        res.json({
            message: "task Checklist Updated",
            task: { ...updatedTask._doc, status: formatStatusForDisplay(updatedTask.status) }
        });
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
}


module.exports = {
    updateTaskChecklist,
    updateTaskStatus,
    deleteTask,
    updateTask,
    createTask,
    getTaskbyId,
    getUserDashboardData,
    getDashboardData,
    getTasks,
}

