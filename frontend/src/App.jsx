import React from 'react'
import { BrowserRouter , Routes , Route} from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Verify from './pages/Verify.jsx'
import VerifyOtp from './pages/VerifyOtp.jsx'
import {ToastContainer} from 'react-toastify';

const App = () => {
  return (
   <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/verify' element={<Verify/>} />
        <Route path='/verifyotp' element={<VerifyOtp/>} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
   </>
  )
}

export default App
