const User = require("../models/user.model")
const bcrypt= require("bcrypt")
const jwt = require("jsonwebtoken")
const Register = require("../models/register.model")

const registerUser = async(req,res) =>{
    const {email,password} = req.body
    try{
        const existingUser = await Register.findOne({email})
        if(existingUser){
            return res.status(400).json({message:"User already exists"})
        }
        const newUser = new Register({email,password})
        await newUser.save()
        res.status(201).json({message:"User Registered Successfully"})
    }catch(err){
        res.status(500).json({message:"Server Error"})
    }
}

const loginUser = async(req,res)=>{
    const {email,password} = req.body
    try{
        const user = await Register.findOne({email})
        if(!user){
            return res.status(400).json({message:"Invalid Credentials"})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({message:"Invalid Credentials"})
        }

        const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"1h"})
        res.status(200).json({token,user})
    }catch(error){
        res.status(500).json({message:"Server Error",details:error.message})
    }
}

const dashboard = async(req,res)=>{
    res.status(200).json({message:`Welcome User ${req.userId} to the protected dashboard`})
}

const createUser = async(req,res) =>{
    try{
        const {name, email, phone, age,gender} = req.body
        const existingUser = await User.findOne({$or:[{email},{phone}]})
        if(existingUser){
            return res.status(400).json({message:"User with this Mail ID or Mobile Number Already Exists"})
        }
        const user = new User({name,email,phone,age,gender})
        await user.save()
        res.status(201).json({message:"User Created Successfully",details:user})
    }
    catch (error){
        res.status(400).json({message:"User data not created",details:error.message})
        console.log("Error",res.status(400).json({message:"User data not created",details:error.message}))
    }
}

const getUsers = async (req,res)=>{
    try{
        const users = await User.find()
        res.json({message:"Users Fetched Succesfully",details:users})
    } catch(error){
        res.status(500).json({message:error.message})
    }
}

const getUser = async(req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        if(!user) return res.status(404).json({message:"User Not found"})
            res.json({message:"User Fetched Successfully",details:user})
    }catch(error){
        res.status(500).json({message:"Error Fetching user",details:error.message})
    }
}

const updateUser = async(req,res)=>{
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id,req.body,{new:true})
        console.log(req.params.id)
        if(!updatedUser) return res.status(404).json({message:"User Not found"})
            res.json(updatedUser)
    }catch(error){
        res.status(500).json({message:"Error Updating User",details:error.message})
    }
}
const deleteUser = async(req,res)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user) return res.status(404).json({message:"User Not Found"})
            res.json({message:"User Deleted Successfully"})
    }
    catch(err){
        res.status(500).json({message:"Error deleting user",details:err.message})
    }
}

module.exports = {registerUser,loginUser,dashboard,createUser,getUsers,getUser,updateUser,deleteUser}