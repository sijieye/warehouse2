import { useContext } from "react";
import { GoogleLogout} from '@leecheuk/react-google-login';
import { SignedContext } from "../contexts/signedContext";


function Sign(){
    const { setLoggedIn, clientID } = useContext(SignedContext)

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