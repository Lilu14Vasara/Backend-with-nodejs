import mongoose, {isValidObjectId} from "mongoose"
import {Playlist} from "../models/playlist.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"


const createPlaylist = asyncHandler(async (req, res) => {
    const {name, description} = req.body
    //TODO: create playlist
    const userId=req.user.id


    if(!mongoose.isValidObjectId(userId)){
        throw new ApiError(404,"Invalid User Id")
    }
    if(!name|| !description){
        throw new ApiError(400," Name and description  Required")
    }
    const playlist=await Comment.create(
       {
        name,
        description,
        user:userId,
       })
     res.status(200).json(new ApiResponse(201, playlist, "Playlist created   successfully"))
})

const getUserPlaylists = asyncHandler(async (req, res) => {
    const {userId} = req.params
    //TODO: get user playlists
    const {page = 1, limit = 10} = req.query
    if(!mongoose.isValidObjectId(userId)){ 
        throw new ApiError(400,"Invalid Playlist ID")
    }
    const playlist=await Playlist.find({user:userId})
    .sort({ createdAt: -1 })
    .skip((Number(page) - 1) * Number(limit)) //(3-1)*5= afer 10 add
    .limit(Number(limit));

   res.status(200).json(new ApiResponse(200, playlist, "Playlist fetched successfully"));
})

const getPlaylistById = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    //TODO: get playlist by id
    if(!isValidObjectId(playlistId)){
        throw new ApiError(400,"Invalid Playlist ID")
    }
    const playlist=await Playlist.findById(playlistId)
    if (!playlist) {
        throw new ApiError(400,"Error while getting Playlist")
    }
     return res
           .status(200)
           .json(new ApiResponse(200,playlist,"Playlist fatched  successfully"))
})

const addVideoToPlaylist = asyncHandler(async (req, res) => {
    const {playlistId, videoId} = req.params
    const userId=req.user.id


    if(!mongoose.isValidObjectId(playlistId)){
        throw new ApiError(404,"Invalid User Id")
    }
    if(!content){
        throw new ApiError(400," Playlist content Required")
    }
    const playlist = await Playlist.findByIdAndUpdate(
        playlistId,
        { $addToSet: { videos: videoId } },
        { new: true }
    );

    if (!playlist) {
        throw new ApiError(404, "Playlist not found");
    }

    res.status(200).json(new ApiResponse(200, playlist, "Video added to playlist successfully"));

})
const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
    const {playlistId, videoId} = req.params
    // TODO: remove video from playlist

    if(!mongoose.isValidObjectId(videoId)){
        throw new ApiError(404,"Invalid User Id")
    }
    if(!content){
        throw new ApiError(400," Comment content Required")
    }
    const playlist = await Playlist.findByIdAndUpdate(
        playlistId,
        { $pull: { videos: videoId } },
        { new: true }
    );

    if (!playlist) {
        throw new ApiError(404, "Playlist not found");
    }

    res.status(200).json(new ApiResponse(200, playlist, "Video removed from playlist successfully"));

})

const deletePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    // TODO: delete playlist
    if(!isValidObjectId(playlistId)){
        throw new ApiError(400,"Invalid video ID")
    }
    const playlist=await Playlist.findByIdAndDelete(playlistId)
    if (!playlist) {
        throw new ApiError(400,"Error while deleting")
    }
     return res
           .status(200)
           .json(new ApiResponse(200,playlist,"Playlist deleted successfully"))
})

const updatePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    const {name, description} = req.body
    //TODO: update playlist 
    if(!isValidObjectId(playlistId)){
        throw new ApiError(400,"Invalid playlist ID")
    }
    
    const playlist=await Playlist.findByIdAndUpdate(
        playlistId, { name, description }, { new: true }
    )
    if (!playlist) {
        throw new ApiError(404, "playlist not found");
    }

    return res.status(200)
              .json(new ApiResponse(200,playlist,"Playlist updated sucessfully"))
})

export {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist
}