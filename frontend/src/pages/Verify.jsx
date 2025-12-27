import React from 'react'
import { useState , useEffect, useCallback} from 'react'
import { useParams, Link } from 'react-router-dom';
import { server } from '../main.jsx';
import axios from 'axios';
import Loading from '../Loading';
import { CheckCircle2, XCircle, ArrowLeft } from 'lucide-react';

const Verify = () => {
  const [successMessage, setSuccessMessage] = useState(''); 
  const [errorMessage, setErrorMessage] = useState('');
  const params = useParams();
  const [loading, setLoading] = useState(true);

  const verifyUser = useCallback(async () => {
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
  }, [params.token]);

  useEffect(() => {
    verifyUser();
  }, [verifyUser]);
  
  return (
    <>
      {loading ? <Loading /> : 
        <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)] px-4 py-8">
          <div className="max-w-md w-full animate-fadeIn">
            <div className="bg-[var(--bg-card)] rounded-2xl p-8 shadow-2xl border border-[var(--border-color)] text-center">
              {successMessage ? (
                <>
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-[var(--success)] bg-opacity-20 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-12 h-12 text-[var(--success)]" />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">
                    Verification Successful!
                  </h2>
                  <p className="text-[var(--text-secondary)] mb-8">
                    {successMessage}
                  </p>
                  <Link 
                    to="/login" 
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] hover:from-[var(--accent-hover)] hover:to-[var(--accent-primary)] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                  >
                    Continue to Login
                  </Link>
                </>
              ) : (
                <>
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-[var(--error)] bg-opacity-20 rounded-full flex items-center justify-center">
                      <XCircle className="w-12 h-12 text-[var(--error)]" />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">
                    Verification Failed
                  </h2>
                  <p className="text-[var(--text-secondary)] mb-8">
                    {errorMessage}
                  </p>
                  <Link 
                    to="/login" 
                    className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default Verify
