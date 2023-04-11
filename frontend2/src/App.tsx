import React, { useEffect, useState } from "react";
import logo from './logo.svg';
import './App.css';
import { SelectChangeEvent } from '@mui/material/Select';
import Grid from "@mui/material/Unstable_Grid2";
import { Button, Typography, FormGroup, TextField, Box, FormControl,  } from "@mui/material";

function App() {

  const [url, setURL] = useState<string>("");

  // const handleSubmit = (event: SelectChangeEvent) => {
  //   // Store value selected, so selection box will display it
  //   setURL(event.target.value);

  //   console.log(url)
  // };

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
            <Button style={{marginTop: "6px"}} type="submit" variant="outlined" onClick={() => alert(url)}>Submit</Button>
          </FormControl>
        </Grid>
      </Grid>
    </div>

  );
  
}

export default App;
