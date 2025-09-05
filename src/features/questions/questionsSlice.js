import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../lib/supabaseClient";

// Async thunk to submit a new question
export const submitQuestion = createAsyncThunk(
  "questions/submitQuestion",
  async ({ userId, questionText, name }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("questions")
        .insert([{ user_id: userId, question_text: questionText, name }])
        .select();

      if (error) {
        throw error;
      }
      return data[0];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to fetch questions asked by the current user
export const fetchUserQuestions = createAsyncThunk(
  "questions/fetchUserQuestions",
  async (userId, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("questions")
        .select("*")
        .eq("user_id", userId)
        .order("asked_at", { ascending: false });

      if (error) {
        throw error;
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to fetch all questions (for admin)
export const fetchAllQuestions = createAsyncThunk(
  "questions/fetchAllQuestions",
  async (_, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("questions")
        .select("*") // Select all columns including 'name'
        .order("asked_at", { ascending: false });

      if (error) {
        throw error;
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for admin to answer a question
export const answerQuestion = createAsyncThunk(
  "questions/answerQuestion",
  async ({ questionId, answerText }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("questions")
        .update({
          admin_answer: answerText,
          answered_at: new Date().toISOString(),
          is_answered: true,
        })
        .eq("id", questionId)
        .select();

      if (error) {
        throw error;
      }
      return data[0];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  userQuestions: [],
  allQuestions: [],
  loading: false,
  error: null,
};

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitQuestion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitQuestion.fulfilled, (state, action) => {
        state.loading = false;
        state.userQuestions.push(action.payload); // Add new question to user's list
        state.error = null;
      })
      .addCase(submitQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.userQuestions = action.payload;
        state.error = null;
      })
      .addCase(fetchUserQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.allQuestions = action.payload;
        state.error = null;
      })
      .addCase(fetchAllQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(answerQuestion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(answerQuestion.fulfilled, (state, action) => {
        state.loading = false;
        // Update the answered question in both userQuestions and allQuestions arrays
        state.userQuestions = state.userQuestions.map((q) =>
          q.id === action.payload.id ? action.payload : q
        );
        state.allQuestions = state.allQuestions.map((q) =>
          q.id === action.payload.id ? action.payload : q
        );
        state.error = null;
      })
      .addCase(answerQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = questionsSlice.actions;
export default questionsSlice.reducer;
