import React, { useEffect, useState } from "react";
import { SignedContext } from "./contexts/signedContext"
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css';
import {gapi} from 'gapi-script'
import Sign from "./pages/signing"
import EnterImage from "./components/enterImage";

function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const clientID = process.env["REACT_APP_CLIENT_ID"] as string

  useEffect(() => {
    function start() {
      gapi.client.init({
        client_id: clientID,
        scope: ""
      })
    }

    gapi.load('client:auth2', start)
  }, [])


  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <SignedContext.Provider value={ {loggedIn, setLoggedIn} }>

        <BrowserRouter>
          <Routes>
                <Route path="/" element = { <Sign/> } />
                <Route  path="/enter" element = { <EnterImage/> } />
          </Routes>
        </BrowserRouter>

      </SignedContext.Provider>

        
    </div>

  );
  
}

export default App;
