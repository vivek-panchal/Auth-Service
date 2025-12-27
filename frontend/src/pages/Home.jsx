import React from 'react'
import { AppData } from '../context/AppContext.jsx'
import { Link, useNavigate } from 'react-router-dom';
const Home = () => {
  const { logoutUser, user } = AppData();
  const navigate = useNavigate();
  return (
    <div className='flex w-[100px] m-auto mt-10 justify-center items-center flex-col gap-4'>
        <h2 className='text-2xl font-semibold'>Welcome Home!</h2>
      <button className='bg-red-500 text-white px-4 py-2 rounded-md' onClick={() => logoutUser(navigate)}>Logout</button>
      {
        user && user.role === 'admin' && (
          
          <Link className='bg-green-500 text-white px-4 py-2 rounded-md mt-2' to="/dashboard">Go to Admin Panel</Link>
          
        )
      }
    </div>
  )
}

export default Home
