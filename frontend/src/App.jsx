import React from 'react'
import { BrowserRouter , Routes , Route} from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Verify from './pages/Verify.jsx'
import VerifyOtp from './pages/VerifyOtp.jsx'
import {ToastContainer} from 'react-toastify';
import { AppData } from './context/AppContext.jsx'
import Loading from './Loading.jsx'

const App = () => {
  const {isAuth , loading} = AppData();
  return (
   <>
    {loading ? <Loading /> : 
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ isAuth ? <Home/> : <Login/>} />
          <Route path='/login' element={isAuth ? <Home/> : <Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/verify' element={<Verify/>} />
          <Route path='/verifyotp' element={ isAuth ? <Home/> : <VerifyOtp/>} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    }
   </>
  )
}

export default App
