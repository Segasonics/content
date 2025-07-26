import mongoose from "mongoose";
//note model
export const noteSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["pending","approved","rejected"],
        default:"pending"
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{
    timestamps:true
})

export const Note = mongoose.model('Note',noteSchema)