import { createContext, useEffect, useState, useContext } from "react";
import { server } from "../main.jsx";
import api from "../apiIntercepter.js";
import { toast } from "react-toastify";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [user, setUser]= useState(null);
  const [loading, setLoading]= useState(true);
  const [isAuth , setIsAuth]= useState(false);
  async function fetchUser(){
        try {
            const response = await api.get(`api/v1/me`);
            setUser(response.data.user);
            setIsAuth(true);
        } catch (error) {
            console.log("Error fetching user:", error);
        }finally{
            setLoading(false);
        }
    }

    async function logoutUser(navigate){
        try {
            const data = await api.post(`api/v1/logout`);
            setUser(null);
            setIsAuth(false);
            toast.success("User logged out successfully");
            navigate('/login');
        } catch (error) {
            toast.error("Error logging out user");
        }
    }
    useEffect(() => {
        fetchUser();
    }, []);

    return (<AppContext.Provider value={{user, setUser, loading, setLoading, isAuth, setIsAuth, logoutUser, fetchUser}}>
            {children}
        </AppContext.Provider>
    );
}

export const AppData = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("AppData must be used within an AppProvider");
    }
    return context;
}