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
    <div>
      {adminData ? <p className="text-center mt-10 text-green-600">{adminData}</p> :
        <p className="text-center mt-10 text-red-600">Loading admin data...</p>
      }
    </div>
  )
}

export default Dashboard
