import { Router } from "express";
import { approveNote, createNote, deleteNote, fetchAllNotesByGroup, pendingNote, rejectNote,fetchAllNotes, generateContent } from "../controllers/note.controller.js";
import { protectedRoute } from "../middleware/protectedRoute.js";

const router = Router();

router.route('/createnote').post(createNote);
router.route('/fetchallnote/:group').get(fetchAllNotesByGroup);
router.route('/fetchallnotes').get(fetchAllNotes);
router.route('/pending-notes').get(protectedRoute,pendingNote);
router.route('/generate').post(generateContent);
router.route('/delete-note/:id').delete(protectedRoute,deleteNote);
router.route('/approve/:id').put(protectedRoute,approveNote)
router.route('/reject/:id').put(protectedRoute,rejectNote)

export default router