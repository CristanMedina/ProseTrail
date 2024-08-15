import { BrowserRouter, Route, Routes } from "react-router-dom";
import FloatingShape from "./components/FloatingShape"

import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";

import './App.css'


function App() {
  return (
    <>
      <div className="fondo-patron min-h-screen flex items-center justify-center relative overflow-hidden">
        <FloatingShape color= 'bg-[#00ccffff]' size='w-64 h-64' top='-5%' left='10%' delay={0}/>
        <FloatingShape color= 'bg-[#00ff11ff]' size='w-64 h-64' top='60%' left='70%' delay={5}/>
        <FloatingShape color= 'bg-[#ff3a3aff]' size='w-64 h-64' top='40%' left='-10%' delay={2}/>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={"Home"}/>
          <Route path='/signup' element={<SignUpPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
        </Routes>
      </BrowserRouter>
      </div>
    </>
  )
}

export default App
