const express = require("express");
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const { getDashboardData, getUserDashboardData, getTasks, getTaskbyId, createTask, updateTask, deleteTask, updateTaskStatus, updateTaskChecklist, addComment, getComments } = require("../controllers/taskController");



const router = express.Router();


router.get("/dashboard-data" , protect , getDashboardData);
router.get("/user-dashboard-data" , protect , getUserDashboardData);
router.get("/" , protect , getTasks);
router.get("/:id" , protect , getTaskbyId);
router.post("/" , protect , adminOnly , createTask);
router.put("/:id" , protect , updateTask);
router.delete("/:id" , protect,  adminOnly , deleteTask);
router.put("/:id/status" , protect , updateTaskStatus);
router.put("/:id/todo" , protect , updateTaskChecklist);

// Comment routes
router.get("/:id/comments", protect, getComments);
router.post("/:id/comments", protect, addComment);


module.exports  = router;

