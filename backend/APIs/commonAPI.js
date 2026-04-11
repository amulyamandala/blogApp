import exp from 'express'
import { UserModel } from '../models/userModel.js'
import { hash,compare } from 'bcrypt'
import {config} from 'dotenv'
import { verifyToken } from '../middleware/verifyToken.js'
import { upload } from '../config/multer.js'
import { uploadToCloudinary } from '../config/cloudinaryUpload.js'
//we can use hashSynch and comparesync for synchronous functions
import jwt from 'jsonwebtoken'
const {sign,verify}=jwt 
export const CommonApp=exp.Router()
//route for register
CommonApp.post("/common",upload.single("profileImageUrl"),async(req,res)=>{
    try{
        //get user from req
        const newUser=req.body
        //check for the role 
        let allowedRoles=['USER','AUTHOR']
        // finding elements in an array using include method it returns true or false 
        if(!allowedRoles.includes(newUser.role)){
          return res.status(400).json({message:"invalid Role"})
        }
        //validators wont work during update but only after save function theyll work to make sure validators work before 
        //we run validators manually 
        
        //hash the password and replace plain with hash
        newUser.password=await hash(newUser.password,12)
        
        //handle file upload to cloudinary
        if(req.file){
            const uploadResult=await uploadToCloudinary(req.file.buffer)
            newUser.profileImageURL=uploadResult.secure_url
        }
        
        //create new user document
        const newUserDoc=new UserModel(newUser)
        await newUserDoc.save()
        
        //auto-login user after registration
        const token=sign({id:newUserDoc._id,email:newUserDoc.email,role:newUserDoc.role},process.env.JWT_SECRET,{expiresIn:"1h"});
        res.cookie("token",token,{
            httpOnly:true,
            sameSite:"lax",
            secure:false,
        })
        
        //send user data without password
        let userObj=newUserDoc.toObject()
        delete userObj.password
        res.status(201).json({message:"user has registered",payload:userObj})
    }catch(err){
        console.log("Registration error:",err)
        res.status(500).json({message:"Registration failed",error:err.message})
    }
})

//route for login geting token
CommonApp.post("/login",async(req,res)=>{
  //roles allowed to login
   const {email,password}=req.body

    let user=await UserModel.findOne({email});
    if(!user){
      return res.status(401).json({message:"Invalid email"});
    }
    const isPasswordValid=await compare(password,user.password);
    if(!isPasswordValid){
      return res.status(401).json({message:"Invalid password"});
    }
    const token=sign({id:user._id,email:user.email,role:user.role},process.env.JWT_SECRET,{expiresIn:"1h"});
    res.cookie("token",token,{//http only cookie
        httpOnly:true,
        sameSite:"lax",
        secure:false,})
        //to delete the pass word 
        let userObj=user.toObject()
        delete userObj.password
    res.status(200).json({message:"Login successful",token,payload:userObj});
})
//route for logout removing token 
CommonApp.get("/logout",(req,res)=>{
  res.clearCookie("token",{
    httpOnly:true,
    sameSite:"lax",
    secure:false,
  })
  res.status(200).json({message:"logout successfull"})
})

//route for checking auth status
CommonApp.get("/check-auth",async(req,res)=>{
  try{
    const token=req.cookies.token
    if(!token){
      return res.status(401).json({message:"no token found"})
    }
    const decoded=verify(token,process.env.JWT_SECRET)
    const user=await UserModel.findById(decoded.id)
    if(!user){
      return res.status(401).json({message:"user not found"})
    }
    let userObj=user.toObject()
    delete userObj.password
    res.status(200).json({message:"user authenticated",payload:userObj})
  }catch(err){
    return res.status(401).json({message:"authentication failed"})
  }
})

CommonApp.put("/password",verifyToken("USER","AUTHOR","ADMIN"),async(req,res)=>{
  //check current password and new password are same or not
  const {email,password,newpassword}=req.body

  //get user from DB
  const user=await UserModel.findOne({email})

  if(!user){
    return res.status(404).json({message:"user not found"})
  }

  //check current password
  const isPasswordValid=await compare(password,user.password)

  if(!isPasswordValid){
    return res.status(401).json({message:"invalid current password"})
  }

  //check if old and new password are same
  const isSame=await compare(newpassword,user.password)

  if(isSame){
    return res.status(400).json({message:"the old and new password cant be the same"})
  }

  //hash new password
  const hashedPassword=await hash(newpassword,12)

  //update password
  const modified=await UserModel.findOneAndUpdate(
      {email:email},
      {$set:{password:hashedPassword}},
      {new:true,runValidators:true},
  )

  //send req
  res.status(200).json({message:"the password has been updated"})
})
