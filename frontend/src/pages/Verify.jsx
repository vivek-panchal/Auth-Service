import React from 'react'
import { useState , useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { server } from '../main.jsx';
import axios from 'axios';
import Loading from '../Loading';

const Verify = () => {
  const [successMessage, setSuccessMessage] = useState(''); 
  const [errorMessage, setErrorMessage] = useState('');
  const params = useParams();
  const [loading, setLoading] = useState(true);

  async function verifyUser(){
    try {
      const {data} = await axios.post(`${server}/api/v1/verify/${params.token}`);
      console.log("Verify response:", data);
      setSuccessMessage(data.message);
    } catch (error) {
      console.log("Error verifying user:", error);
      setErrorMessage(error.response.data.message);
    }
    finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    verifyUser();
  }, []);
  return (
    <div className="container max-w-3xl mx-auto px-6 py-20">
      {loading ? (
        <Loading />
      ) : (
        <div className="bg-neutral-900/70 backdrop-blur rounded-2xl p-8 md:p-10 ring-1 ring-white/10 shadow-xl shadow-black/30">
          {successMessage ? (
            <p className="text-center text-emerald-400 text-lg">{successMessage}</p>
          ) : (
            <p className="text-center text-rose-400 text-lg">{errorMessage}</p>
          )}
        </div>
      )}
    </div>
  )
}

export default Verify
