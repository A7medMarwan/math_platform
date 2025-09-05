import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import appReducer from "../features/app/appSlice";
import mathPlatformReducer from "../features/mathPlatform/mathPlatformSlice";
import questionsReducer from "../features/questions/questionsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    app: appReducer,
    mathPlatform: mathPlatformReducer,
    questions: questionsReducer,
  },
});

export default store;
