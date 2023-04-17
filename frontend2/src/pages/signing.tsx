import LogIn from "../components/logIn";
import LogOut from "../components/logOut";
import Grid from "@mui/material/Unstable_Grid2";
import { Typography } from "@mui/material";

function Sign(){
    return(
        <div>
            <Grid container spacing={2} style={{ padding: "1rem" }}>
                
                <Grid xs={12} container alignItems="center" justifyContent="center">
                    <Typography variant="h3" gutterBottom>
                        Login to view the Data Entry Frontend
                    </Typography>
                </Grid>
        
                <Grid xs={12} container alignItems="center" justifyContent="center" padding={"2em"}>
                    <LogIn />
                </Grid>

                <Grid xs={12} container alignItems="center" justifyContent="center">
                    <LogOut />
                </Grid>
            </Grid>
        </div>
    );
}
export default Sign;
