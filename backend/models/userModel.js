import { Schema,model } from "mongoose";
const userSchema=new Schema({
    firstName:{
        type:String,
        required:[true,"First name is required"]
    },
    lastName:{
        type:String
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:[true,"User already registered"]
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    },
    role:{
        type:String,
        enum:["USER","AUTHOR","ADMIN"],
        required:[true,"{Value} is a/an Invalid role"]
    },
    profileImageURL:{
        type:String
    },
    isUserActive:{
        type:Boolean,
        default:true
    }
    },
    {
        timestamps:true,
        versionKey:false,
        strict:"throw"
    }
);
export const UserModel=model("user",userSchema)