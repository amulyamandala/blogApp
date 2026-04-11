import exp from 'express'
import { verifyToken } from '../middleware/verifyToken.js'
import { ArticleModel } from '../models/articleModel.js'
export const UserApp=exp.Router()
//registration and login are done in common api 
//view articles of all authors (public)
UserApp.get("/articles",async(req,res)=>{
  //read articles 
  const articlelist=await ArticleModel.find({isArticleActive:true})
  res.status(200).json({message:"articles",payload:articlelist})
})

//write comments
UserApp.put("/articles",verifyToken("USER"),async(req,res)=>{
    //get body from req
    const {articleId,comment}=req.body
     //check article
     const articleDocument=await ArticleModel.findOne({_id:articleId,isArticleActive:true})
     if(!articleDocument){
        return res.status(404).json({message:"article not found"})
     }
     //get user id 
     const userId=req.user?.id;
     //add comment to comments array of the articledocument 
     articleDocument.comments.push({user:userId,comment:comment})
     await articleDocument.save()
     res.status(200).json({message:"the comments have been added",payload:articleDocument})
})

