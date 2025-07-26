import { Router } from "express";
import { approveNote, createNote, deleteNote, fetchAllNotes, pendingNote, rejectNote } from "../controllers/note.controller.js";
import { protectedRoute } from "../middleware/protectedRoute.js";

const router = Router();

router.route('/createnote').post(protectedRoute,createNote);
router.route('/fetchallnote').get(protectedRoute,fetchAllNotes);
router.route('/pending-notes').get(protectedRoute,pendingNote);
router.route('/delete-note/:id').delete(protectedRoute,deleteNote);
router.route('/approve/:id').put(protectedRoute,approveNote)
router.route('/reject/:id').put(protectedRoute,rejectNote)

export default router