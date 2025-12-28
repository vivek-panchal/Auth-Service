import React from 'react'
import { BrowserRouter , Routes , Route} from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Verify from './pages/Verify.jsx'
import VerifyOtp from './pages/VerifyOtp.jsx'
import Dashboard from './pages/Dashboard.jsx'
import {ToastContainer} from 'react-toastify';
import { AppData } from './context/AppContext.jsx'
import Loading from './Loading.jsx'
import Header from './components/Header.jsx'

const App = () => {
  const {isAuth , loading} = AppData();
  return (
   <div className="min-h-screen bg-neutral-950 text-neutral-200 antialiased selection:bg-indigo-500/30 relative overflow-x-hidden">
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="relative w-full h-full max-w-6xl mx-auto">
        <div className="absolute -top-24 left-0 w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl"></div>
        <div className="absolute top-10 right-0 w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl"></div>
      </div>
    </div>
    {loading ? <Loading /> : 
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={ isAuth ? <Home/> : <Login/>} />
          <Route path='/login' element={isAuth ? <Home/> : <Login/>} />
          <Route path='/register' element={isAuth ? <Home/> : <Register/>} />
          <Route path='/token/:token' element={isAuth ? <Home/> : <Verify/>} />
          <Route path='/verifyotp' element={ isAuth ? <Home/> : <VerifyOtp/>} />
          <Route path='/dashboard' element={ isAuth ? <Dashboard/> : <Login/>} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    }
   </div>
  )
}

export default App
