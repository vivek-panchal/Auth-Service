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
    <div className="container max-w-5xl mx-auto px-6 py-20">
      {loading ? (
        <Loading />
      ) : (
        <div className="bg-neutral-900/70 backdrop-blur rounded-2xl p-8 md:p-10 ring-1 ring-white/10 shadow-xl shadow-black/30">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-400/30">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l7 4v6c0 5-3 7-7 10C8 19 5 17 5 12V6l7-4Z"/></svg>
            </span>
            <h2 className="text-xl font-medium text-neutral-100">Email Verification</h2>
          </div>
          {successMessage ? (
            <p className="text-center text-emerald-400 text-lg">{successMessage}</p>
          ) : (
            <p className="text-center text-rose-400 text-lg">{errorMessage}</p>
          )}
          <p className="text-xs text-neutral-500 mt-4 text-center">If verification fails, ensure you used the latest link.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
            <div className="rounded-xl border border-white/10 p-4 bg-neutral-900/60">
              <p className="text-xs text-neutral-400">Step 1</p>
              <p className="text-sm text-neutral-200 mt-1">Open latest email</p>
            </div>
            <div className="rounded-xl border border-white/10 p-4 bg-neutral-900/60">
              <p className="text-xs text-neutral-400">Step 2</p>
              <p className="text-sm text-neutral-200 mt-1">Click verification link</p>
            </div>
            <div className="rounded-xl border border-white/10 p-4 bg-neutral-900/60">
              <p className="text-xs text-neutral-400">Step 3</p>
              <p className="text-sm text-neutral-200 mt-1">Return to the app</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Verify
