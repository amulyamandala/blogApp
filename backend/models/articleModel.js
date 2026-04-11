import { Schema,model,Types } from "mongoose";
//comment schema
const commentSchema=new Schema({
    user:{
        type:Types.ObjectId,
        ref:"user",
        required:[true,"user name is required"]
    },
    comment:{
        type:String,
        reqired:[true,"add comment to submit"]
    }
})
//article schema
const articleSchema=new Schema({
author:{
    type:Types.ObjectId,
    ref:"user",
    reqired:[true,"author id is required"]
},
title:{
    type:String,
    required:[true,"title is required"]
},
category:{
    type:String,
    required:[true,"category is required"],

},
content:{
    type:String,
    required:[true,"content is required"]
},
isArticleActive:{
    type:Boolean,
    default:true
},
comments:[{type:commentSchema, default:[]}] //from comment schema

},
{
    versionKey:false,
    timestamps:true,
    strict:"throw"
})
export const ArticleModel=model("article",articleSchema)




//comment:{comment}{username}