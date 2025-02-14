import mongoose, {isValidObjectId} from "mongoose"
import {User} from "../models/user.model.js"
import { Subscription } from "../models/subscription.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"


const toggleSubscription = asyncHandler(async (req, res) => {
    const {channelId} = req.params
    const {userId}=req.user.id
    // TODO: toggle subscription
    
        if(!mongoose.isValidObjectId(channelId)){
            throw new ApiError(400,"Invalid video ID")
        }
        const existingSubscription=await Subscription.findById( {channel: channelId, subscriber: userId })
       
        if (existingSubscription) {
            await existingSubscription.deleteOne();
            return res.status(200).json(new ApiResponse(200, null, "Unsubscribed successfully"));
        } else {
            await Subscription.create({ channel: channelId, subscriber: userId });
            return res.status(201).json(new ApiResponse(201, null, "Subscribed successfully"));
        }
})

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    const {channelId} = req.params
    if(!isValidObjectId(channelId)){
        throw new ApiError(400,"Invalid User Id")
    }

    const subscriber=await Subscription.find({channel:channelId}).populate("subscriber", "name email")

    res.status(200).json(new ApiResponse(200,subscriber,"Subscriber list fetched successfully"))

})

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
    const { subscriberId } = req.params;
    if(!isValidObjectId(subscriberId)){
        throw new ApiError(400,"Invalid User Id")
    }

    const subscriber=await Subscription.find({subscriber:subscriberId}).populate("channel", "name email")
    // Populate :Fetches referenced documents – Instead of just showing ObjectIds, it retrieves actual documents.

    res.status(200).json(new ApiResponse(200,subscriber,"Subscribed list fetched successfully"))


})

export {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
}