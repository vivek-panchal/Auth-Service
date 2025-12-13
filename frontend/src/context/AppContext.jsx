import { createContext, useEffect, useState, useContext } from "react";
import { server } from "../main.jsx";
import axios from "axios";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [user, setUser]= useState(null);
  const [loading, setLoading]= useState(true);
  const [isAuth , setIsAuth]= useState(false);
  async function fetchUser(){
        try {
            const data = await axios.get(`${server}/api/v1/me`,{
                withCredentials:true,
            });
            setUser(data);
            setIsAuth(true);
            setLoading(false);
        } catch (error) {
            console.log("Error fetching user:", error);
        }finally{
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchUser();
    }, []);

    return (<AppContext.Provider value={{user, setUser, loading, setLoading, isAuth, setIsAuth}}>
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