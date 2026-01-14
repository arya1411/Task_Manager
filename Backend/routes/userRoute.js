const express = require("express");
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const { getUsers, getUserById, deleteUser } = require("../controllers/userController");

const router = express.Router();

// Define user routes here when ready
router.get('/' , protect , adminOnly , getUsers);
router.get("/:id", protect, getUserById); // fixed: was "./:id"
router.delete("/:id" , protect ,adminOnly , deleteUser);



module.exports = router;
