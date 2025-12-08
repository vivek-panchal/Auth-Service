import React from 'react'
import { BrowserRouter , Routes , Route} from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Verify from './pages/Verify.jsx'

const App = () => {
  return (
   <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/verify' element={<Verify/>} />
      </Routes>
    </BrowserRouter>
   </>
  )
}

export default App
