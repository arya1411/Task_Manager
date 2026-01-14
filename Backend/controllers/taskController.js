const Task = require("../models/Task.js");

const getTasks = async(req , res) => {

    try {
        const { status } = req.query;
        const filter = {};

        if (status) {
            filter.status = status;
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
            return {
                ...task._doc,
                completedTodoCount: completedCount,
            };
        });


        const roleFilter = req.user.role === "admin" ? {} : { assignedTo: req.user._id };

        const allTasks = await Task.countDocuments({ ...filter, ...roleFilter });

        const pendingTasks = await Task.countDocuments({
            ...filter,
            ...roleFilter,
            status: "pending",
        });

        const inProgressTasks = await Task.countDocuments({
            ...filter,
            ...roleFilter,
            status: "in-progress",
        });

        const completedTasks = await Task.countDocuments({
            ...filter,
            ...roleFilter,
            status: "completed",
        });
        
        return res.status(200).json({
            tasks,
            statusSummary: {
                all: allTasks,
                pending: pendingTasks,
                inProgress: inProgressTasks,
                completed: completedTasks,
            },
        });
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
}

const getDashboardData = async(req , res) => {

    try {
        const totalTasks  = await Task.countDocuments();
        const pendingTasks = await Task.countDocuments({ status: "pending" });
        const completedTasks = await Task.countDocuments({ status: "completed" });
        const overdueTask  = await Task.countDocuments({
            status: { $ne: "completed" },
            dueDate: { $lt: new Date() },
        });
        const taskStatuses = ["pending", "in-progress", "completed"];
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
        const pendingTasks = await Task.countDocuments({ assignedTo: userId, status: "pending" });
        const completedTasks = await Task.countDocuments({ assignedTo: userId, status: "completed" });
        const overdueTask = await Task.countDocuments({
            assignedTo:userId,
            status : {$ne: "completed"},
            dueDate : {$lt : new Date()},
        });

        const taskStatuses = ["pending" , "in-progress" , "completed" ];
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
            },
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

        return res.status(200).json(task);
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
            dueDate,
            assignedTo,
            attachments,
            todoChecklist,
        } = req.body;
        
        if(!Array.isArray(assignedTo)){
            return res
            .status(400)
            .json({message : "Assigned To must be an array of User Id "});

        }

        const task = await Task.create({
            title,
            description,
            priority,
            dueDate,
            assignedTo,
            createdBy : req.user._id,
            todoChecklist,
            attachments,

        });

        res.status(201).json({message : "Task Created Succesfully" , task});
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
        task.todoChecklist = req.body.todoChecklist || task.todoChecklist;
        task.attachments = req.body.attachments || task.attachments;

        if(req.body.assignedTo){
            if(!Array.isArray(req.body.assignedTo)){
                return res
                .status(400)
                .json({message :"Assignedto Must be an Array of User IDs"});
            }

            task.assignedTo = req.body.assignedTo;
        }

        await task.save();
        return res.status(200).json({ message: "Task updated successfully", task });
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

        task.status = req.body.status || task.status;
        if(task.status === "completed"){
            task.todoChecklist.forEach((item) =>(item.completed = true));
            task.progress = 100;
        }

        await task.save();
        res.json({message : "Task Status Completed" , task });
    } catch (error){
        return res.status(500).json({message : "Server Error " , error : error.message});
    }
};

const updateTaskChecklist = async(req , res) => {

    try {
        const {todoChecklist} = req.body;
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

        task.todoChecklist  = todoChecklist;
        const completedCount = task.todoChecklist.filter(
            (item) => item.completed
        ) .length;
        const totalItems = task.todoChecklist.length;
        task.progress = totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;

        if(task.progress === 100){
            task.status = "completed";
        } else if(task.progress > 0){
            task.status = "in-progress";
        } else {
            task.status = "pending";
        }
        await task.save();
        const updatedTask  = await Task.findById(req.params.id).populate(
            "assignedTo",
            "name email profileImageUrl"
        );

        res.json({message : "task Checklist Updated" , task:updatedTask});
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

