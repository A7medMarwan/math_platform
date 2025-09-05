import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // ⚠️ WARNING: THIS IS HIGHLY INSECURE AND FOR DEMONSTRATION PURPOSES ONLY.
      // Hardcoding passwords in client-side code is a major security vulnerability.
      // In a real application, authentication should always happen on a secure backend.

      let user = null;

      if (email === "Muharraq.Math25@gmail.com" && password === "Math2025") {
        user = {
          id: "user-id-123",
          email: "Muharraq.Math25@gmail.com",
          role: "user",
          accessToken: "static-user-access-token",
          refreshToken: "static-user-refresh-token",
        };
      } else if (
        email === "MuharraqAdmin.Math25@gmail.com" &&
        password === "Admin-Math123"
      ) {
        user = {
          id: "admin-id-456",
          email: "MuharraqAdmin.Math25@gmail.com",
          role: "admin",
          accessToken: "static-admin-access-token",
          refreshToken: "static-admin-refresh-token",
        };
      }

      if (!user) {
        throw new Error("Invalid credentials");
      }

      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to logout user
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      // No longer needed for static client-side auth
      // const { error } = await supabase.auth.signOut();
      // if (error) {
      //   throw new Error(error.message);
      // }
      localStorage.removeItem("supabase_access_token");
      localStorage.removeItem("supabase_refresh_token");
      localStorage.removeItem("user_email");
      return null;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem("supabase_access_token");
      const refreshToken = localStorage.getItem("supabase_refresh_token");
      const userEmail = localStorage.getItem("user_email");

      if (accessToken && refreshToken && userEmail) {
        // Reconstruct user based on static data in localStorage
        let userRole = "user"; // Default role
        if (userEmail === "MuharraqAdmin.Math25@gmail.com") {
          userRole = "admin";
        }

        return {
          id:
            userEmail === "Muharraq.Math25@gmail.com"
              ? "user-id-123"
              : "admin-id-456",
          email: userEmail,
          role: userRole,
        };
      }

      return null;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
        localStorage.setItem(
          "supabase_access_token",
          action.payload.accessToken
        );
        localStorage.setItem(
          "supabase_refresh_token",
          action.payload.refreshToken
        );
        localStorage.setItem("user_email", action.payload.email); // Store user email
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.user = null;
      })
      // Logout cases
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      // Check auth cases
      .addCase(checkAuth.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload;
          state.isAuthenticated = true;
        } else {
          state.user = null;
          state.isAuthenticated = false;
        }
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
