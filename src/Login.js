import { GoogleLogin } from 'react-google-login';
import { useState } from 'react';
import { Redirect } from 'react-dom';
import { Switch } from 'react-router-dom';
import Notes from './Notes';

function Login() {

    const [user, setUser] = useState();
    const clientId = "369522005554-u0be98s6qpeg7p4hlcuggu7j0h88a6la.apps.googleusercontent.com";

    function onSuccess(res) {
        console.log(res, "SUCCESS");
        setUser(res);
    }

    function onFailure(res) {
        console.log(res, "fAILED");
        setUser(res);
    }

    return (

        user ?
        <Notes/>
        :
        <GoogleLogin
            clientId={clientId}
            onFailure={onFailure}
            onSuccess={onSuccess}
            buttonText="Login"
            cookiePolicy="single_host_origin"
            isSignedIn={true}
        />
    );
}

export default Login;