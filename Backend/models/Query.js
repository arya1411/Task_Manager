const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const mongoose = require("mongoose");
const Task = require("./Task");

const MONGO_URI = process.env.MONGO_URL;

console.log("MONGO_URI:", MONGO_URI);

const insertTask = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB");

        const newTask = await Task.create({
            title: "Complete project1 documentation",
            description: "Write comprehensive documentation for the API endpoints",
            priority: "High",
            status: "Pending",
            dueDate: new Date("2026-03-10"),
            assignedTo: [], 
            createdBy: [], 
            todoChecklist: [
                { text: "Write API overview", completed: false },
                { text: "Document endpoints", completed: false },
                { text: "Add code examples", completed: false }
            ],
            progress: 0
        });

        console.log("Task created successfully:", newTask);
    } catch (error) {
        console.error("Error:", error.message);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB");
    }
};

insertTask();