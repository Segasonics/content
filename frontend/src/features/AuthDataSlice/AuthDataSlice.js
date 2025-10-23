import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axiosInstance";

//async thung to login a user
//sends email and password to the backend
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/users/login", {
        email,
        password,
      });
      //localStorage.setItem("user", JSON.stringify(data.data.user));
      console.log(data.data);
      return data.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
//signup sends email and password
export const signup = createAsyncThunk(
  "auth/signup",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/users/register", {
        email,
        password,
      });
      return data.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
//logout a user
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/users/logout");
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const refresh = createAsyncThunk(
  "auth/refresh",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/users/refresh");
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const authUser = createAsyncThunk(
  "auth/user",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/users/me");
      console.log(data.data);
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const resetPassword = createAsyncThunk(
  "auth/reset-password",
  async (form, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/users/reset-password", form);
      console.log(data.data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//slice to manage the state
const authDataSlice = createSlice({
  name: "users",
  initialState: {
    user: null,
    loading: false,
    error: null,
    accessToken: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
    },
  },
  //each thunk has three states pending fulffiled and rjected
  extraReducers: (builder) => {
    //login
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //signup
      .addCase(signup.pending, (state) => {
        state.loading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //logout
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //authuser
      .addCase(authUser.pending, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(authUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(authUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload;
      })
      //refreshtoken
      .addCase(refresh.pending, (state) => {
        state.status = "loading";
      })
      .addCase(refresh.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.accessToken = action.payload.data.accessToken; // your backend sends it
      })
      .addCase(refresh.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});
export const { logoutUser, setUser } = authDataSlice.actions;
export default authDataSlice.reducer;
