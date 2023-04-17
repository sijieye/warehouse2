import { useContext } from "react";
import { GoogleLogout} from 'react-google-login'
import { SignedContext } from "../contexts/signedContext";


function Sign(){
    const clientID = process.env["REACT_APP_CLIENT_ID"] as string

    const { setLoggedIn } = useContext(SignedContext)

    const onSuccessLogout = () => {
        setLoggedIn(false);
    }


    return(
        <div id="signButton">
            <div>
                <GoogleLogout
                    clientId={clientID}
                    buttonText='Logout'
                    onLogoutSuccess={onSuccessLogout}
                />
            </div>
        </div>
    )
}

export default Sign;