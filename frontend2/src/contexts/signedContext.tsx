import React, { createContext } from "react";

type SignedContextType = {
  loggedIn: boolean,
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
  clientID: string,
  queueURL: string
}

const infoSignedContextState = {
  loggedIn: false,
  setLoggedIn: () => {},
  clientID: "",
  queueURL: ""
}

export const SignedContext = createContext<SignedContextType>(infoSignedContextState)