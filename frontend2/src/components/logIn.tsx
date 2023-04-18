import { useContext } from "react";
import { GoogleLogin } from '@leecheuk/react-google-login'
import { useNavigate } from "react-router-dom";
import { SignedContext } from "../contexts/signedContext";


function LogIn(){
    const { setLoggedIn, clientID } = useContext(SignedContext)
    const navigate = useNavigate();

    const onSuccessLogin = (res: any) => {
        setLoggedIn(true);
        navigate("/enter");
    }
    const onFailure = (res: any) => {
        alert("Only BU emails are authorized! Try again with a BU email!")
    }


    return(
        <div id="signButton">
            <div>
                <GoogleLogin
                    clientId={clientID}
                    buttonText='Login'
                    onSuccess={onSuccessLogin}
                    onFailure={onFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                />
            </div>
        </div>
        
    )
}

export default LogIn;