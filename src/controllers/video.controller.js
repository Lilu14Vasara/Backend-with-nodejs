import mongoose, {isValidObjectId} from "mongoose"
import {Video} from "../models/video.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"


const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query
    const filter = {};

    if (query) {
        filter.title = { $regex: query, $options: "i" };
    }
    if (userId && isValidObjectId(userId)) {
        filter.user = userId;
    }

    const videos = await Video.find(filter)
        .sort({ [sortBy]: sortType === "asc" ? 1 : -1 })
        .skip((page - 1) * limit)
        .limit(Number(limit));
    
    res.json(new ApiResponse(200, videos, "Videos fetched successfully"));
    //TODO: get all videos based on query, sort, pagination
})

const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description} = req.body
    const userId = req.user.id;
    const videoFilepath=req.file?.path

    if(!videoFilepath){
        throw new ApiError(400,"Video file not found")
    }
    const videoUrl=await uploadOnCloudinary(videoFilepath)
    if (!videoUrl.path) {
        throw new ApiError(400,"Error while uploading")
    }
        const video = await Video.create({
         title,
         description,
         url: videoUrl.url,
         user: userId
     });
     res.json(new ApiResponse(201, video, "Video published successfully"));
    // TODO: get video, upload to cloudinary, create video
})

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params

    if(!isValidObjectId(videoId)){
        throw new ApiError(400,"Invalid video ID")
    }
    const video=await Video.findById(videoId)
    if (!video) {
        throw new ApiError(400,"Error while getting")
    }
     return res
           .status(200)
           .json(
            new ApiResponse(200,video,"Video fatched  successfully")
           )
    //TODO: get video by id
})

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    const{title,description,thumbnail}=req.body
    if(!isValidObjectId(videoId)){
        throw new ApiError(400,"Invalid video ID")
    }
    // const videoUrl = await uploadOnCloudinary(videoLocalPath)

    // if (!avatar.url) {
    //     throw new ApiError(400, "Error while uploading on avatar")
        
    // }
    const video=await Video.findByIdAndUpdate(
        videoId, { title, description,thumbnail }, { new: true }
    )
    if (!video) {
        throw new ApiError(404, "Video not found");
    }

    return res.status(200)
              .json(new ApiResponse(200,video,"Video detail  updated"))
    //TODO: update video details like title, description, thumbnail

})

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    if(!isValidObjectId(videoId)){
        throw new ApiError(400,"Invalid video ID")
    }
    const video=await Video.findByIdAndDelete(videoId)
    if (!video) {
        throw new ApiError(400,"Error while deleting")
    }
     return res
           .status(200)
           .json(
            new ApiResponse(200,video,"Video deleted successfully")
           )
    //TODO: delete video
})

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    if(!isValidObjectId(videoId)){
        throw new ApiError(400,"Invalid video ID")
    }
    const video=await Video.findById(videoId)
    if (!video) {
        throw new ApiError(400,"Error while fetching")
    }
    video.isPublished = !video.isPublished;
      await video.save();
      res.status(200).json(new ApiResponse(
        200, video, `Video is now ${video.isPublished ? 'published' : 'private'}.`
    ));
})

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}


