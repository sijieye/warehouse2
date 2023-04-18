import { useEffect, useState } from "react";
import { SignedContext } from "./contexts/signedContext"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { gapi } from 'gapi-script';

import './App.css';
import Sign from "./pages/signing"
import EnterImage from "./components/enterImage";

function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [clientID, setClientID] = useState<string>("");
  const [queueURL, setQueueURL] = useState<string>("");

  const getClientID = async () => {
    const res = await fetch("https://queuekeys.azurewebsites.net/api/cid", {
      method: "GET"
    })
  
    const json = await res.text();
  
    setClientID(json);
  };

  const getQueueURL = async () => {
    const res = await fetch("https://queuekeys.azurewebsites.net/api/qurl", {
      method: "GET"
    })
  
    const json = await res.text();
  
    setQueueURL(json);
  };

  useEffect(() => {
    getClientID();
    getQueueURL();
  })

  useEffect(() => {
    if (clientID && queueURL){
      const start = (() => {
        gapi.client.init({
          client_id: clientID,
          scope: ""
        })
      });

      gapi.load('client:auth2', start)
    }
  }, [])

  if(!clientID || !queueURL){
    return (
      <div> <center> <h1> Loading ... </h1> </center> </div>
    )
  }

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <SignedContext.Provider value={ {loggedIn, setLoggedIn, clientID, queueURL} }>

        <BrowserRouter>
          <Routes>
                <Route path="/" element = { <Sign /> } />
                <Route  path="/enter" element = { <EnterImage/> } />
          </Routes>
        </BrowserRouter>

      </SignedContext.Provider>
    </div>
  );
}

export default App;
