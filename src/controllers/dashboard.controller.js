import mongoose from "mongoose"
import {Video} from "../models/video.model.js"
import {Subscription} from "../models/subscription.model.js"
import {Like} from "../models/like.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const getChannelStats = asyncHandler(async (req, res) => {
    // TODO: Get the channel stats like total video views, total subscribers, total videos, total likes etc.
    const { channelId } = req.params;

    if (!mongoose.isValidObjectId(channelId)) {
        throw new ApiError(400, "Invalid channel ID");
    }

    const totalVideos = await Video.countDocuments({ user: channelId });
    const totalSubscribers = await Subscription.countDocuments({ channel: channelId });
    const totalLikes = await Like.countDocuments({ channel: channelId });
    const totalViews = await Video.aggregate([
        { $match: { user: new mongoose.Types.ObjectId(channelId) } },
        { $group: { _id: null, totalViews: { $sum: "$views" } } }
    ]);

    res.status(200).json(new ApiResponse(200, {
        totalVideos,
        totalSubscribers,
        totalLikes,
        totalViews: totalViews.length ? totalViews[0].totalViews : 0,
    }, "Channel stats fetched successfully"));
});

const getChannelVideos = asyncHandler(async (req, res) => {
    // TODO: Get all the videos uploaded by the channel
    const {channelId} = req.params
    const {page = 1, limit = 10} = req.query
    if(!mongoose.isValidObjectId(channelId)){
        throw new ApiError(400,"Invalid video ID")
    }
    const comment=await Video.find({user:channelId})
    .sort({ createdAt: -1 })
    .skip((Number(page) - 1) * Number(limit)) //(3-1)*5= afer 10 add
    .limit(Number(limit));

   res.status(200).json(new ApiResponse(200, comment, "Chennel video fetched successfully"));

})
 
export {
    getChannelStats, 
    getChannelVideos
    }