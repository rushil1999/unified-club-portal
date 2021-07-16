import React, { useState, useEffect, createContext } from "react";
import { VERIFY_TOKEN } from "../../services/constants";

export const AuthContext =  createContext();


const ProvideAuth = ({ children }) => {
  const [authState, setAuthState] = useState(null);
  const [loading, setLoading]=useState(true);
  const [user, setUser] = useState(null);

  const getAuthentication = async () => {
    const token = window.localStorage.getItem('token');
    const userObj = window.localStorage.getItem('user');
    const user = JSON.parse(userObj);
    if(token){
      setLoading(true);
      const response = await fetch(`${VERIFY_TOKEN}/${token}`);
      setAuthState(response.status === 200); 
      setUser(user);
      setLoading(false);
    }
    else{
      setAuthState(false);
    }
  }
  useEffect(()=>{
    getAuthentication();
  },[]);
  
  return (
    <AuthContext.Provider value={{authenticated: authState, loading, setAuthState, user, setUser}}>
      {children}
    </AuthContext.Provider>
  );
}

export default ProvideAuth;
