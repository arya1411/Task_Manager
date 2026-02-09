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
                    status : "pending",
                });
                const InprogressTask = await Task.countDocuments({
                    assignedTo : user._id,
                    status : "In Progress",
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





const deleteUser = async (req , res ) =>{
    try {

    } catch (error){
        res.status(500).json({message : "Server Error" , error : error.message });


    }
};

module.exports = {getUsers , getUserById  , deleteUser};

