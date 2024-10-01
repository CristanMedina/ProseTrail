import { useEffect, Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from "react-hot-toast";

import { useAuthStore } from "./store/authStore";

import TopNavbar from "./components/SideBar";

const FloatingShape = lazy(() => import("./components/FloatingShape"));
const LoadingSpinner = lazy(() => import("./components/LoadingSpinner"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const EmailVerificationPage = lazy(() => import("./pages/EmailVerificationPage"));
const ForgotPasswordPage = lazy(() => import("./pages/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("./pages/ResetPasswordPage"));
const LandingPage = lazy(() => import("./pages/LandingPage"));

import './App.css';
import MyBooksPage from "./pages/MyBooksPage";
import EditBookPage from "./pages/EditBookPage";
import LibraryPage from "./pages/LibraryPage";
import BookPage from "./pages/BookPage";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <LoadingSpinner />;

  return (
    <div className="fondo-patron min-h-screen flex items-center justify-center relative overflow-hidden">
      <Suspense fallback={<LoadingSpinner />}>
        <Router>
            <TopNavbar />
          <FloatingShape size='w-32 h-32' top='30%' left='80%' delay={0} />

          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/perfil/:userId"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/mis-libros/:userId"
              element={
                <ProtectedRoute>
                  <MyBooksPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/escritura/:id"
              element={
                  <EditBookPage />
              }
            />
            <Route
              path="/biblioteca"
              element={
                <LibraryPage/>
              }
            />
            <Route
                path="/libro/:bookId"
                element={<BookPage/>}
            />
            <Route
              path="/signup"
              element={
                <RedirectAuthenticatedUser>
                  <SignUpPage />
                </RedirectAuthenticatedUser>
              }
            />
            <Route
              path="/login"
              element={
                <RedirectAuthenticatedUser>
                  <LoginPage />
                </RedirectAuthenticatedUser>
              }
            />
            <Route path="/verify-email" element={<EmailVerificationPage />} />
            <Route
              path="/forgot-password"
              element={
                <RedirectAuthenticatedUser>
                  <ForgotPasswordPage />
                </RedirectAuthenticatedUser>
              }
            />
            <Route
              path="/reset-password/:token"
              element={
                <RedirectAuthenticatedUser>
                  <ResetPasswordPage />
                </RedirectAuthenticatedUser>
              }
            />
          </Routes>
        </Router>
      </Suspense>
      <Toaster />
    </div>
  );
}

export default App;
