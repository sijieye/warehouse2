import React, { createContext } from "react";

type SignedContextType = {
    loggedIn: boolean,
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
  }
  
  const infoSignedContextState = {
    loggedIn: false,
    setLoggedIn: () => {}
  }
  
  export const SignedContext = createContext<SignedContextType>(infoSignedContextState)