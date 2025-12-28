import axios from 'axios';
import React from 'react'
import { toast } from 'react-toastify';
import { server } from '../main.jsx';
import api from '../apiIntercepter.js';
import { useState, useEffect } from 'react';

const Dashboard = () => {
  const [adminData, setAdminData] = React.useState(null); 
  async function fetchAdminData(){
    try {
      const {data} = await api.get(`${server}/api/v1/admin` , { withCredentials: true });
      setAdminData(data.message);
      
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  useEffect(() => {
    fetchAdminData();
  }, []);
  return (
    <div className="container max-w-3xl mx-auto px-6 py-20">
      <div className="bg-neutral-900/70 backdrop-blur rounded-2xl p-8 md:p-10 ring-1 ring-white/10 shadow-xl shadow-black/30">
        {adminData ? (
          <p className="text-center text-emerald-400 text-lg">{adminData}</p>
        ) : (
          <p className="text-center text-neutral-400 text-lg">Loading admin data...</p>
        )}
      </div>
    </div>
  )
}

export default Dashboard
