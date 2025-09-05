import { Route, Routes, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "../features/auth/authSlice";
import ProtectedRoute from "../components/ProtectedRoute";
import {
  منصة_وحيدة as HomePage,
  LoginPage,
  قوة_البدايات as BeginningsPage,
  المعلم_المبدع_الصغير as YoungCreativeTeacherPage,
  خوارزميات_المحرق as AlgorithmsPage,
  منصة_اسأل_سؤال as AskQuestionPage,
  نادي_التدريب as TrainingClubPage,
  دانات_الرياضيات as MathPearlsPage,
  كنوز_الرياضيات as MathTreasuresPage,
  تكنوماث as TechnoMathPage,
  SectionListPage, // Import the new SectionListPage
  ResourceListPage, // Import the new ResourceListPage
  AdminQuestionManagementPage, // Import new admin question page
} from "../pages";
import WomdatProblemSolving from "../pages/ومضات_في_حل_المشكلات/ومضات_في_حل_المشكلات";
import ومضات_تفاصيل from "../pages/ومضات_في_حل_المشكلات/تفاصيل";

export default function AppRoutes() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/questions"
        element={
          <ProtectedRoute>
            <AdminQuestionManagementPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student"
        element={
          <ProtectedRoute>
            <Navigate to="/" replace />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Navigate to="/" replace />
          </ProtectedRoute>
        }
      />
      <Route
        path="/قوة-البدايات"
        element={
          <ProtectedRoute>
            <BeginningsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ومضات-في-حل-المشكلات"
        element={
          <ProtectedRoute>
            <WomdatProblemSolving />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ومضات-في-حل-المشكلات/:slug"
        element={
          <ProtectedRoute>
            <ومضات_تفاصيل />
          </ProtectedRoute>
        }
      />
      <Route
        path="/المعلم-المبدع-الصغير"
        element={
          <ProtectedRoute>
            <YoungCreativeTeacherPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/خوارزميات-المحرق"
        element={
          <ProtectedRoute>
            <AlgorithmsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/منصة-اسأل-سؤال"
        element={
          <ProtectedRoute>
            <AskQuestionPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/نادي-التدريب"
        element={
          <ProtectedRoute>
            <TrainingClubPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/دانات-الرياضيات"
        element={
          <ProtectedRoute>
            <MathPearlsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/كنوز-الرياضيات"
        element={
          <ProtectedRoute>
            <MathTreasuresPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/تكنوماث"
        element={
          <ProtectedRoute>
            <TechnoMathPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/platform/:projectId/sections"
        element={
          <ProtectedRoute>
            <SectionListPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/platform/:projectId/sections/:sectionId/resources"
        element={
          <ProtectedRoute>
            <ResourceListPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
