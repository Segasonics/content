import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axiosInstance";



//Async thunk to create a new note.
//Sends POST request with title and content to backend.

export const createNote = createAsyncThunk(
  'note/create',
  async ({ title, content }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post('/notes/createnote', { title, content });
      return data.data.content
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

//fetches all approved notes from the backend
export const fetchallNote = createAsyncThunk(
  'note/fetchall',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get('/notes/fetchallnote');
      console.log(data.data.content)
      return data.data.content
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)
//approves a note by id
export const approveNote = createAsyncThunk(
  'note/approve',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(`/notes/approve/${id}`);
      console.log(data)
      return data.data.content
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)
//fetches all pending notes
export const pendingNote = createAsyncThunk(
  'note/pending',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get('/notes/pending-notes');
      return data.data.content
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
);

//deletes a note by id
export const deleteNote = createAsyncThunk(
  'note/delete',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(`/notes/delete-note/${id}`);
      console.log(data)
      return id
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
);
//rejects a note by id
export const rejectNote = createAsyncThunk(
  'note/reject',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(`/notes/reject/${id}`);
      return data.data.content
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)
//slice to manage content state
const ContentDataSlice = createSlice({
  name: 'contents',
  initialState: {
    contents: [],
    pendingContent: [],
    loading: false,
    error: null,
  },
  //for synchronous reducers
  reducers: {},
  //each thunk has three state pending fulfilled and rejected
  extraReducers: (builder) => {
    // Create Note
    builder
      .addCase(createNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.loading = false;
        state.pendingContent.push(action.payload) // assuming `note` is returned
      })
      .addCase(createNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch All Notes
    builder
      .addCase(fetchallNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchallNote.fulfilled, (state, action) => {
        console.log(action.payload)
        state.loading = false;
        state.contents = action.payload;
      })
      .addCase(fetchallNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Approve Note
    builder
      .addCase(approveNote.fulfilled, (state, action) => {
        state.contents.push(action.payload)
      });

    // Pending Notes
    builder
      .addCase(pendingNote.pending, (state) => {
        state.loading = true;
      })
      .addCase(pendingNote.fulfilled, (state, action) => {
        state.loading = false;
        state.pendingContent = action.payload;
      })
      .addCase(pendingNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Delete Note
    builder
      .addCase(deleteNote.fulfilled, (state, action) => {
        const deletedId = action.payload; 
        state.contents = state.contents.filter(note => note._id !== deletedId);
        state.pendingContent = state.pendingContent.filter(note => note._id !== deletedId);
      });

  },
});


export default ContentDataSlice.reducer;
