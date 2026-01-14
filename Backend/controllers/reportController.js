const Task = require("../models/Task");
const User = require("../models/User");
const excelJS = require("exceljs");

/* =========================
   EXPORT TASK REPORT
========================= */
const exportTaskReport = async (req, res) => {
    try {
        const tasks = await Task.find()
            .populate("assignedTo", "name email")
            .lean();

        const workbook = new excelJS.Workbook();
        const worksheet = workbook.addWorksheet("Task Report");

        worksheet.columns = [
            { header: "Task ID", key: "_id", width: 25 },
            { header: "Title", key: "title", width: 30 },
            { header: "Description", key: "description", width: 50 },
            { header: "Priority", key: "priority", width: 20 },
            { header: "Status", key: "status", width: 20 },
            { header: "Due Date", key: "dueDate", width: 20 },
            { header: "Assigned To", key: "assignedTo", width: 35 },
        ];

        tasks.forEach(task => {
            const assignedTo = Array.isArray(task.assignedTo)
                ? task.assignedTo
                      .map(user => `${user.name} (${user.email})`)
                      .join(", ")
                : "Unassigned";

            worksheet.addRow({
                _id: task._id.toString(),
                title: task.title,
                description: task.description,
                priority: task.priority,
                status: task.status,
                dueDate: task.dueDate
                    ? task.dueDate.toISOString().split("T")[0]
                    : "",
                assignedTo,
            });
        });

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
            "Content-Disposition",
            'attachment; filename="task_report.xlsx"'
        );

        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        res.status(500).json({
            message: "Error exporting task report",
            error: error.message,
        });
    }
};

/* =========================
   EXPORT USER REPORT
========================= */
const exportUserReport = async (req, res) => {
    try {
        const users = await User.find()
            .select("name email _id")
            .lean();

        const tasks = await Task.find()
            .populate("assignedTo", "name email _id")
            .lean();

        const userTaskMap = {};

        users.forEach(user => {
            userTaskMap[user._id] = {
                name: user.name,
                email: user.email,
                taskCount: 0,
                pendingTask: 0,
                inProgressTask: 0,
                completedTask: 0,
            };
        });

        tasks.forEach(task => {
            if (Array.isArray(task.assignedTo)) {
                task.assignedTo.forEach(user => {
                    const stats = userTaskMap[user._id];
                    if (!stats) return;

                    stats.taskCount += 1;

                    if (task.status === "Pending") {
                        stats.pendingTask += 1;
                    } else if (task.status === "In Progress") {
                        stats.inProgressTask += 1;
                    } else if (task.status === "Completed") {
                        stats.completedTask += 1;
                    }
                });
            }
        });

        const workbook = new excelJS.Workbook();
        const worksheet = workbook.addWorksheet("User Task Report");

        worksheet.columns = [
            { header: "User Name", key: "name", width: 30 },
            { header: "Email", key: "email", width: 40 },
            { header: "Total Assigned Tasks", key: "taskCount", width: 22 },
            { header: "Pending Tasks", key: "pendingTask", width: 20 },
            { header: "In Progress Tasks", key: "inProgressTask", width: 22 },
            { header: "Completed Tasks", key: "completedTask", width: 22 },
        ];

        Object.values(userTaskMap).forEach(user => {
            worksheet.addRow(user);
        });

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
            "Content-Disposition",
            'attachment; filename="user_report.xlsx"'
        );

        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        res.status(500).json({
            message: "Error exporting user report",
            error: error.message,
        });
    }
};

module.exports = {
    exportTaskReport,
    exportUserReport,
};
