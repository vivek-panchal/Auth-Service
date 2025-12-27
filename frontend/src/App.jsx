import React from 'react'
import { BrowserRouter , Routes , Route} from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Verify from './pages/Verify.jsx'
import VerifyOtp from './pages/VerifyOtp.jsx'
import Dashboard from './pages/Dashboard.jsx'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
          <Route path='/register' element={isAuth ? <Home/> : <Register/>} />
          <Route path='/token/:token' element={isAuth ? <Home/> : <Verify/>} />
          <Route path='/verifyotp' element={ isAuth ? <Home/> : <VerifyOtp/>} />
          <Route path='/dashboard' element={ isAuth ? <Dashboard/> : <Login/>} />
        </Routes>
        <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          style={{
            '--toastify-color-dark': 'var(--bg-card)',
            '--toastify-text-color-dark': 'var(--text-primary)',
          }}
        />
      </BrowserRouter>
    }
   </>
  )
}

export default App
