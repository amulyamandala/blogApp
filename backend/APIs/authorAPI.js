import exp from 'express'
import { ArticleModel } from '../models/articleModel.js'
import { UserModel } from '../models/userModel.js'
import { verifyToken } from '../middleware/verifyToken.js'
export const AuthorApp=exp.Router()



//write article(protected route)
AuthorApp.post("/article",verifyToken("AUTHOR"),async(req,res)=>{
    const articleObj=req.body
    //get the user from decoded token
    let user=req.user.email
    console.log(user);
    let author=await UserModel.findById(articleObj.author)

    if(!author){
        return res.status(404).json({message:"author not found"})
    }

    //check if emails are same or not
    if(author.email!=user){
        return res.status(403).json({message:"you are not the authorized author"})
    }

    articleObj.author=req.user.id

    const auDoc=new ArticleModel(articleObj)
    await auDoc.save()
    res.status(201).json({message:"Article published succesfully",payload:auDoc})
})



//read own article
AuthorApp.get("/articles",verifyToken("AUTHOR"),async(req,res)=>{
   const authorIdofToken=req.user?.id
   const list=await ArticleModel.find({author:authorIdofToken})
    res.status(200).json({message:"the article are as follows",payload:list})
})



//edit article
AuthorApp.put("/data",verifyToken("AUTHOR"),async(req,res)=>{
    //get author id from decoded token
const authorIdOfToken=req.user?.id
    //get modified article from client
    const{articleId,title,category,content}=req.body
const modifiedArticle=await ArticleModel.findOneAndUpdate(
    {_id:articleId,author:authorIdOfToken},
    {$set:{title,category,content}},
    {new:true,runValidators:true},)
    if(!modifiedArticle){
       return res.status(403).json({message:"not authorized to edit"}) 
    }
 res.status(200).json({message:"updated artcle successfully ",payload:modifiedArticle})
})


//delete and restore article
AuthorApp.patch("/articles",verifyToken("AUTHOR"),async(req,res)=>{
     //get author id from decoded token
const authorIdOfToken=req.user?.id
    //get modified article from client
    const{articleId,isArticleActive}=req.body
    //get article by id 
    const articleOfDB=await ArticleModel.findOne({_id:articleId,author:authorIdOfToken})

    if(!articleOfDB){
        return res.status(404).json({message:"article not found"})
    }

    //check status
    if(isArticleActive===articleOfDB.isArticleActive){
        return res.status(200).json({message:"article in same state"})
    }
    articleOfDB.isArticleActive=isArticleActive
    await articleOfDB.save()
    //send response 
return res.status(200).json({message:"article status updated",payload:articleOfDB})
})