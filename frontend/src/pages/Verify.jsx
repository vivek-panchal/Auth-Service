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
      setSuccessMessage(data.message);
    } catch (error) {
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
    <>
      {loading ? <Loading /> : 
        successMessage ? <p className="text-center mt-10 text-green-600">{successMessage}</p> :
        <p className="text-center mt-10 text-red-600">{errorMessage}</p>
      }
    </>
  )
}

export default Verify
