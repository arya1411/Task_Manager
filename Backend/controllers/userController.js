const Task  = require("../models/Task");
const User = require("../models/User");
const bcrypt  = require("bcryptjs");


const getUsers = async (req , res ) =>{
    try {
        const users = await User.find({role : 'member'}).select("-password");

        const userWithTaskCounts = await Promise.all(
            users.map(async (user) =>{
                const pendingTask = await Task.countDocuments({
                    assignedTo : user._id,
                    status : "Pending",
                });
                const InprogressTask = await Task.countDocuments({
                    assignedTo : user._id,
                    status : "In_Progress",
                });
                const completedTask = await Task.countDocuments({
                    assignedTo : user._id,
                    status : "Completed",
                });

                return {
                    ...user._doc,
                    pendingTask,
                    InprogressTask,
                    completedTask,
                };
            })
        );
        res.json(userWithTaskCounts);
    } catch (error){
        res.status(500).json({message : "Server Error" , error : error.message });


    }
};



const getUserById = async (req , res ) =>{
    try {

    } catch (error){
        res.status(500).json({message : "Server Error" , error : error.message });


    }
};

const createUser = async (req, res) => {
    try {
        const { name, email, password, profileImageUrl, adminInviteToken } = req.body;

        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please provide name, email and password" });
        }

        // Determine role based on admin invite token
        let role = 'member';
        if (adminInviteToken && adminInviteToken === process.env.ADMIN_INVITE_TOKEN) {
            role = 'admin';
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            profileImageUrl,
            role,
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            profileImageUrl: user.profileImageUrl,
        });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};





const deleteUser = async (req , res ) =>{
    try {

    } catch (error){
        res.status(500).json({message : "Server Error" , error : error.message });


    }
};

module.exports = { getUsers, getUserById, createUser, deleteUser };

