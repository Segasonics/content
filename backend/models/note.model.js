import mongoose from "mongoose";
//note model
export const noteSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["pending","approved","rejected"],
        default:"pending"
    },
    group:{
        type:String,
        enum:["group1","group2"],
        required:true,
    }
},{
    timestamps:true
})

export const Note = mongoose.model('Note',noteSchema)