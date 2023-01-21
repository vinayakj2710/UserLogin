import React, {useState, useEffect, createContext} from 'react'

const AuthContext = createContext(
    null
);

export const AuthContextProvider = (props) => {
    const[isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(()=>{
        const loggedInUserDetails = localStorage.getItem('isLoggedIn');
    
        if(loggedInUserDetails === '1'){
          setIsLoggedIn(true);
        }
      },[])
    
      const loginHandler = (email, password) => {
        // We should of course check email and password
        // But it's just a dummy/ demo anyways
        localStorage.setItem('isLoggedIn', '1');
        setIsLoggedIn(true);
      };
    
      const logoutHandler = () => {
        setIsLoggedIn(false);
        localStorage.setItem('isLoggedIn', '0');
      };
    
    return(
        <AuthContext.Provider 
            value={{
                isLoggedIn: isLoggedIn,
                onLogout: logoutHandler,
                onLogin: loginHandler
            }}
            >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;