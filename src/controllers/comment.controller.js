import mongoose from "mongoose"
import {Comment} from "../models/comment.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const getVideoComments = asyncHandler(async (req, res) => {
    //TODO: get all comments for a video
    const {videoId} = req.params
    const {page = 1, limit = 10} = req.query
    if(!mongoose.isValidObjectId(videoId)){ 
        throw new ApiError(400,"Invalid video ID")
    }
    const comment=await Comment.find({video:videoId})
    .sort({ createdAt: -1 })
    .skip((Number(page) - 1) * Number(limit)) //(3-1)*5= afer 10 add
    .limit(Number(limit));

   res.status(200).json(new ApiResponse(200, comment, "Comments fetched successfully"));

})

const addComment = asyncHandler(async (req, res) => {

    const{content}=req.body;
    const{videoId}=req.params;
    const userId=req.user.id


    if(!mongoose.isValidObjectId(videoId)){
        throw new ApiError(404,"Invalid User Id")
    }
    if(!content){
        throw new ApiError(400," Comment content Required")
    }
    const comment=await Comment.create(
       {
        content,
        user:userId,
        video:videoId
       })
     res.status(200).json(new ApiResponse(201, comment, "Comment added successfully"))
    // TODO: add a comment to a video
})

const updateComment = asyncHandler(async (req, res) => {
    // TODO: update a comment
    const{content}=req.body;
    const{commentId}=req.params;

    if(!mongoose.isValidObjectId(commentId)){
        throw new ApiError(404,"Invalid User Id")
    }
    if(!content){
        throw new ApiError(400," Comment Content Required")
    }
    const comment=await Comment.findByIdAndUpdate(
        commentId,
       {content},
       {new:true})

    if (!comment) {
        throw new ApiError(404,"Comment not found")
    }

     res.status(200).json(new ApiResponse(201, comment, "Comment updated successfully"))
})

const deleteComment = asyncHandler(async (req, res) => {
    // TODO: delete a comment
    
    const{commentId}=req.params;
    
    if(!mongoose.isValidObjectId(commentId)){
        throw new ApiError(404,"Invalid User Id")
    }
    
    const comment=await Comment.findByIdAndDelete( commentId)
    if(!comment){
        throw new ApiError(404,"Comment not found")
    }

     res.status(200).json(new ApiResponse(201, comment, "Comment deleted successfully"))
})

export {
    getVideoComments, 
    addComment, 
    updateComment,
    deleteComment
    }




