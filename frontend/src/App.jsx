import React, { useEffect, Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { useAuthStore } from "./store/authStore";

const FloatingShape = lazy(() => import("./components/FloatingShape"));
const LoadingSpinner = lazy(() => import("./components/LoadingSpinner"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const EmailVerificationPage = lazy(() => import("./pages/EmailVerificationPage"));
const ForgotPasswordPage = lazy(() => import("./pages/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("./pages/ResetPasswordPage"));
const LandingPage = lazy(() => import("./pages/LandingPage"));


import './App.css'


// PROTEGER RUTAS
const ProtectedRoute = ({ children }) => {
  const {isAuthenticated, user } = useAuthStore();

  if(!isAuthenticated)
    {
      return <Navigate to="/login" replace/>
    }

  if(!user.isVerified)
    {
      return <Navigate to="/verify-email" replace/>
    }

    return children;
}

// REDIRIGIR CUENTAS AUTENTICADAS
const RedirectAuthenticatedUser = ({ children }) => {
  const {isAuthenticated, user } = useAuthStore();

  if(isAuthenticated && user.isVerified) {
    return <Navigate to="/" replace/>
  }

  return children;
}


function App() {

  const { isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth()
  }, [checkAuth]);

  if(isCheckingAuth) return <LoadingSpinner/>

  return (
    <>
      <div className="fondo-patron min-h-screen flex items-center justify-center relative overflow-hidden">
        <Suspense fallback={<LoadingSpinner />}>
          <FloatingShape color= 'bg-[#5900ffff]' size='w-64 h-64' top='-5%' left='10%' delay={0}/>
          <FloatingShape color= 'bg-[#ff006aff]' size='w-64 h-64' top='60%' left='70%' delay={5}/>
          <FloatingShape color= 'bg-[#00ffc8ff]' size='w-64 h-64' top='40%' left='-10%' delay={2}/>

        <BrowserRouter>
          <Routes>
              <Route 
              path='/' 
              element={<LandingPage/>}/>

              <Route 
              path='/profile' 
              element={
                <ProtectedRoute>
                  <ProfilePage/>
                </ProtectedRoute>
              }/>

              <Route 
              path='/signup' 
              element={
                <RedirectAuthenticatedUser>
                  <SignUpPage/>
                </RedirectAuthenticatedUser>
                }/>

              <Route 
              path='/login' 
              element={
                <RedirectAuthenticatedUser>
                  <LoginPage/>
                </RedirectAuthenticatedUser>
                }/>

              <Route 
              path='/verify-email' 
              element={<EmailVerificationPage/>}/>

              <Route 
              path='/forgot-password' 
              element={
                <RedirectAuthenticatedUser>
                  <ForgotPasswordPage/>
                </RedirectAuthenticatedUser>}/>

              <Route 
              path='/reset-password/:token' 
              element={
                <RedirectAuthenticatedUser>
                  <ResetPasswordPage/>
                </RedirectAuthenticatedUser>}/>

          </Routes>
        </BrowserRouter>
      </Suspense>
      <Toaster/>
      </div>
    </>
  )
}

export default App
