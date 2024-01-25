import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    user: null,
    token: null,
    setUser: () => {},
    setToken: () => {},

})

export const ContextProvider = ({children}) => {
    const [user, _setUser] = useState(localStorage.getItem('CURRENT_USER') || '');
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN') || '');


    const setUser = (user) =>{
      _setUser(user)
      if(user){
        localStorage.setItem('CURRENT_USER', user);
      }else{
        localStorage.removeItem('CURRENT_USER');
      }
    }

    const setToken = (token) => {
      _setToken(token)
      if (token) {
          localStorage.setItem('ACCESS_TOKEN', token);
        } else {
          localStorage.removeItem('ACCESS_TOKEN');
        }
    }
    return(
      <StateContext.Provider value={{
        user, setUser,
        token, setToken,
      }}>
        {children}
      </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);