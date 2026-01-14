const express = require("express");
const {protect, adminOnly} = require("../middlewares/authMiddleware");
const { exportTaskReport, exportUserReport } = require("../controllers/reportController");
const router = express.Router();

router.get("/exports/tasks" , protect , adminOnly , exportTaskReport);
router.get("/exports/users" , protect , adminOnly , exportUserReport);



module.exports = router;
