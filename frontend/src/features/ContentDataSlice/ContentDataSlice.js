import { createAsyncThunk, createSlice, isPending } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axiosInstance";

// ------------------------ Async Thunks ------------------------ //

// Create a new note
export const createNote = createAsyncThunk(
  "note/create",
  async ({ content, group }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/notes/createnote", {
        content,
        group,
      });
      return data.data.content;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Something went wrong" }
      );
    }
  }
);

// Fetch all approved notes
export const fetchallNote = createAsyncThunk(
  "note/fetchall",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/notes/fetchallnotes");
      return data.data.content;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Something went wrong" }
      );
    }
  }
);

// Fetch all approved notes by group
export const fetchallNoteByGroup = createAsyncThunk(
  "note/fetchallByGroup",
  async (group, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/notes/fetchallnote/${group}`);
      return data.data.content;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Something went wrong" }
      );
    }
  }
);

// Approve a note by ID
export const approveNote = createAsyncThunk(
  "note/approve",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(`/notes/approve/${id}`);
      return data.data.content;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Something went wrong" }
      );
    }
  }
);

// Fetch all pending notes
export const pendingNote = createAsyncThunk(
  "note/pending",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/notes/pending-notes");
      return data.data.content;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Something went wrong" }
      );
    }
  }
);

// Delete a note by ID
export const deleteNote = createAsyncThunk(
  "note/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/notes/delete-note/${id}`);
      return id; // returning id to remove it from state
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Something went wrong" }
      );
    }
  }
);

// Reject a note by ID
export const rejectNote = createAsyncThunk(
  "note/reject",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(`/notes/reject/${id}`);
      return data.data.content;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Something went wrong" }
      );
    }
  }
);

//generate a note
export const generateContent = createAsyncThunk(
  "note/generate",
  async ({ title }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/notes/generate", { title });
      return data.data.content;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Something went wrong" }
      );
    }
  }
);
// ------------------------ Slice ------------------------ //

const ContentDataSlice = createSlice({
  name: "contents",
  initialState: {
    contents: [],
    pendingContent: [],
    loading: false,
    isNoteGenerating: false,
    isDeleting: false,
    error: null,
    isApproving: false,
    isRejecting: false,
    isPending: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create Note
      .addCase(createNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.loading = false;
        state.pendingContent.push(action.payload);
      })
      .addCase(createNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to create note";
      })

      // Fetch all notes
      .addCase(fetchallNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchallNote.fulfilled, (state, action) => {
        state.loading = false;
        state.contents = action.payload;
      })
      .addCase(fetchallNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch notes";
      })

      // Fetch notes by group
      .addCase(fetchallNoteByGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.contents = []; // clear old group notes
      })
      .addCase(fetchallNoteByGroup.fulfilled, (state, action) => {
        state.loading = false;
        state.contents = action.payload;
      })
      .addCase(fetchallNoteByGroup.rejected, (state, action) => {
        state.loading = false;
        state.contents = []; // ensure empty on error
        state.error =
          action.payload?.message || "Failed to fetch notes by group";
      })

      // Approve note
      .addCase(approveNote.pending, (state) => {
        state.isApproving = true;
        state.error = null;
      })
      .addCase(approveNote.fulfilled, (state, action) => {
        state.contents.push(action.payload);
        state.isApproving = false;
      })
      .addCase(approveNote.rejected, (state, action) => {
        state.isApproving = false;
        state.error = action.payload?.message || "Failed to approve note";
      })
      // Fetch pending notes
      .addCase(pendingNote.pending, (state) => {
        state.isPending = true;
        state.error = null;
      })
      .addCase(pendingNote.fulfilled, (state, action) => {
        state.isPending = false;
        state.pendingContent = action.payload;
      })
      .addCase(pendingNote.rejected, (state, action) => {
        state.isPending = false;
        state.error =
          action.payload?.message || "Failed to fetch pending notes";
      })

      // Delete note
      .addCase(deleteNote.pending, (state) => {
        state.isDeleting = true;
        state.error = null;
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.isDeleting = false;
        const id = action.payload;
        state.contents = state.contents.filter((note) => note._id !== id);
        state.pendingContent = state.pendingContent.filter(
          (note) => note._id !== id
        );
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.isDeleting = false;
        state.error = action.payload?.message || "Failed to delete note";
      })
      // Reject note
      .addCase(rejectNote.pending, (state) => {
        state.isRejecting = true;
        state.error = null;
      })
      .addCase(rejectNote.fulfilled, (state, action) => {
        state.isRejecting = false;
        state.contents = state.contents.filter(
          (note) => note._id !== action.payload._id
        );
        state.pendingContent = state.pendingContent.filter(
          (note) => note._id !== action.payload._id
        );
      })
      .addCase(rejectNote.rejected, (state, action) => {
        state.isRejecting = false;
        state.error = action.payload?.message || "Failed to reject note";
      })
      //generate Note
      .addCase(generateContent.pending, (state) => {
        state.isNoteGenerating = true;
        state.error = null;
      })
      .addCase(generateContent.fulfilled, (state, action) => {
        state.isNoteGenerating = false;
        state.pendingContent.push(action.payload);
      })
      .addCase(generateContent.rejected, (state, action) => {
        state.isNoteGenerating = false;
        state.error = action.payload?.message || "Failed to generate note";
      });
  },
});

export default ContentDataSlice.reducer;
