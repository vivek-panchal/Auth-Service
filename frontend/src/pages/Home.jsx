import React from 'react'
import { AppData } from '../context/AppContext.jsx'
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const { logoutUser } = AppData();
  const navigate = useNavigate();
  return (
    <div className='flex w-[100px] m-auto mt-10 justify-center items-center flex-col gap-4'>
        <h2 className='text-2xl font-semibold'>Welcome Home!</h2>
      <button className='bg-red-500 text-white px-4 py-2 rounded-md' onClick={() => logoutUser(navigate)}>Logout</button>
    </div>
  )
}

export default Home
