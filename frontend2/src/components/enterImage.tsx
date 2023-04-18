import { useContext, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Button, Typography, TextField, FormControl,  } from "@mui/material";
import { Navigate } from "react-router-dom";
import { SignedContext } from "../contexts/signedContext";
import LogOut from "./logOut";

function EnterImage() {
  const [url, setURL] = useState<string>("");
  
  const {loggedIn, queueKey} = useContext(SignedContext)

  if(!loggedIn){
    return <Navigate to="/" />
  }
  
  const handleSubmit = async () => {
    fetch(queueKey, {
      mode: "no-cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: url
    })
  }

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Grid container spacing={2} style={{ padding: "1rem" }}>
        <Grid xs={12} container alignItems="center" justifyContent="center">
          <Typography variant="h2" gutterBottom>
            Insert Image URL
          </Typography>
        </Grid>
      
        <Grid xs={12} container alignItems="center" justifyContent="center">
          <FormControl style={{display: "inline"}}>
            <TextField InputProps={{style: {marginRight: "10px", width: '40em'}}} name="urlInsert" onInput={ event=>setURL((event.target as HTMLInputElement).value)} />
            <Button style={{marginTop: "6px"}} type="submit" variant="outlined" onClick={() => handleSubmit()}>Submit</Button>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={2} style={{ padding: "1rem" }}>
          <Grid xs={12} container alignItems="center" justifyContent="center">
              <LogOut />
          </Grid>
      </Grid>
    </div>

  );
  
}

export default EnterImage;


