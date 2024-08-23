import express from "express";
import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
  {
    videofile: {
      type: String, //url will be taken from cloud
      required: true,
    },
    thumbNail: {
      type: String, //url will be taken from cloud
      required: true,
    },
    title: {
      type: String, //url will be taken from cloud
      required: true,
    },
    description: {
      type: String, //url will be taken from cloud
      required: true,
    },
    duration:{
        type:Number, //cloudnary we will get the duartion
        required:true,
    },
    views:{
        type:Number,
        default:0
    },
    isPublished:{
        type:Boolean,
        default:true
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
  },
  {timestamps: true }
);
videoSchema.plugin(mongooseAggregatePaginate)
export const videoModel=mongoose.model("Video",videoSchema)