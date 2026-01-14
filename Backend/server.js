require("dotenv").config();
const express = require("express");
const cors  = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoute");
const userRoutes = require("./routes/userRoute");
const taskRoutes = require("./routes/taskRoute");
const reportRoutes = require("./routes/reportRoute");
const upload = require("./middlewares/uploadMiddleware"); // added

const app = express();

app.use(
    cors({
        origin: process.env.CLIENT_URL || "*",
        methods : ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders : ["Content-Type" , "Authorization"],
    })
);

connectDB();
app.use(express.json());

// serve uploaded files (matches uploadMiddleware.js destination)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// added: handle POST /api/auth/uploads (matches your Postman URL)
app.post("/api/auth/uploads", upload.single("image"), (req, res) => {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const url = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.status(201).json({
        message: "Uploaded",
        filename: req.file.filename,
        path: `/uploads/${req.file.filename}`,
        url,
    });
});


app.use('/api/auth' , authRoutes);
app.use('/api/users' , userRoutes);
app.use('/api/tasks' , taskRoutes);
app.use('/api/reports' , reportRoutes);

// basic error handler (incl. multer/fileFilter errors)
app.use((err, req, res, next) => {
    const status = err?.name === 'MulterError' ? 400 : (err?.statusCode || 500);
    res.status(status).json({ message: err?.message || 'Server error' });
});

const PORT  = process.env.PORT || 5000 ;
app.listen(PORT ,() => console.log(`Server Running on Port ${PORT}`));
