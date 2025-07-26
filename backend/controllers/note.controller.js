import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from '../utils/ApiError.js';
import { Note } from '../models/note.model.js'
//create note controller
export const createNote = asyncHandler(async (req, res) => {
    const { title, content } = req.body;
    //if one of the fields is empty it throws an error
    if ([title, content].some((field) => field.trim() === "")) {
        throw new ApiError(400, "All fields are required")
    }
    //check if user is logged in
    if (!req.user || !req.user._id) {
        throw new ApiError(400, "Login or signup to submit a content")
    }
    //creating the note 
    const newContent = await Note.create({
        title,
        content,
        owner: req.user._id,
    });

    const findContent = await Note.findById(newContent._id);
    if (!findContent) {
        throw new ApiError(400, "Note cannot be found")
    }
    res.status(201).json(new ApiResponse(200, { content: newContent }, "Content created successfully"))
});
//delete note controller
export const deleteNote = asyncHandler(async (req, res) => {
    //look for note by id
    let note = await Note.findById(req.params.id)
    if (!note) {
        throw new ApiError(400, "Content not found")
    }
    //check if user is an admin
    if (req.user.role !== "admin") {
        throw new ApiError(401, "You don't have permission to delete this note");
    }

    await note.deleteOne();

    return res.status(200)
        .json(new ApiResponse(201, {}, "Note deleted"))
});
//fetchall note controller
export const fetchAllNotes = asyncHandler(async (req, res) => {
    //find all note
    const user = req.user;
    if(!user){
        throw new ApiError(400,"Unauthorised")
    }
    const notes = await Note.find({ status: "approved" });
    // if no available note it throws an error
    if (notes.length === 0) {
        throw new ApiError(400, "No notes found!!... Start adding some")
    }
    res.status(201).json(new ApiResponse(200, { content: notes }, "Notes fetched successfully"))
})
//fetching pending note controller
export const pendingNote = asyncHandler(async (req, res) => {
    //find pending notes or rejected notes
    const notes = await Note.find({ status: { $in: ["pending", "rejected"] } });

    if (!notes) {
        throw new ApiError(404, "No pending notes")
    };

    res.status(200)
        .json(new ApiResponse(200, { content: notes }, "Notes fetched successfully"))

});
//approve note controller
export const approveNote = asyncHandler(async (req, res) => {
    //check if user is an admin
    if (req.user.role !== "admin") {
        throw new ApiError(403, "Unauthorized");
    }
    const note = await Note.findByIdAndUpdate(req.params.id, { status: "approved" }, { new: true });

    if (!note) {
        throw new ApiError(404, "Note not found")
    };

    res.status(200).json(new ApiResponse(200, { content: note }, "Note approved"))

})

export const rejectNote = asyncHandler(async (req, res) => {
    //check if user is an admin
    if (req.user.role !== "admin") {
        throw new ApiError(403, "Unauthorized");
    }
    const note = await Note.findByIdAndUpdate(req.params.id, { status: "rejected" }, { new: true });

    if (!note) {
        throw new ApiError(404, "Note not found")
    };

    res.status(200).json(new ApiResponse(200, { content: note }, "Note approved"))

})