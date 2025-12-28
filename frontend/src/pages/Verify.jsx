import React from 'react'
import { useState , useEffect, useCallback} from 'react'
import { useParams, Link } from 'react-router-dom';
import { server } from '../main.jsx';
import axios from 'axios';
import Loading from '../Loading';
import { CheckCircle2, XCircle, ArrowRight, Shield } from 'lucide-react';

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
        <div className="min-h-screen flex items-center justify-center px-5 py-10">
          <div className="w-full max-w-[420px] animate-scaleIn">
            <div className="form-card p-8 text-center">
              {successMessage ? (
                <>
                  {/* Success */}
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-[var(--success-bg)] rounded-xl flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8 text-[var(--success)]" />
                    </div>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
                    Verified!
                  </h2>
                  <p className="text-[var(--text-muted)] mb-7">
                    {successMessage}
                  </p>
                  
                  <Link to="/login" className="btn-primary">
                    Continue to Login
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </>
              ) : (
                <>
                  {/* Error */}
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-[var(--error-bg)] rounded-xl flex items-center justify-center">
                      <XCircle className="w-8 h-8 text-[var(--error)]" />
                    </div>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
                    Verification Failed
                  </h2>
                  <p className="text-[var(--text-muted)] mb-7">
                    {errorMessage || 'Something went wrong. Please try again.'}
                  </p>
                  
                  <Link to="/login" className="btn-secondary w-full justify-center">
                    Back to Login
                  </Link>
                </>
              )}
            </div>
            
            {/* Footer */}
            <div className="mt-6 text-center">
              <div className="flex items-center justify-center gap-2 text-[var(--text-muted)]">
                <Shield className="w-4 h-4" />
                <span className="text-sm">AuthService</span>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default Verify
