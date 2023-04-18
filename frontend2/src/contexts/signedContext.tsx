import React, { createContext } from "react";

type SignedContextType = {
  loggedIn: boolean,
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
  clientID: string,
  queueKey: string
}

const infoSignedContextState = {
  loggedIn: false,
  setLoggedIn: () => {},
  clientID: "",
  queueKey: ""
}

export const SignedContext = createContext<SignedContextType>(infoSignedContextState)