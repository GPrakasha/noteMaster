import  React, { useState } from  "react";
import { Route, Redirect } from  "react-router-dom";
import firebase from 'firebase';
import { GoogleLogin } from 'react-google-login';

function  PrivateRoute (props) {

    const [user, setUser] = useState();

    const clientId = "369522005554-u0be98s6qpeg7p4hlcuggu7j0h88a6la.apps.googleusercontent.com";

    function onSuccess(res) {
        console.log(res, "SUCCESS");
        setUser(res);
        localStorage.setItem("user_email", res.profileObj.email);
    }

    function onFailure(res) {
        console.log(res, "fAILED");
        setUser(res);
    }

    return  user ? (<Route  path={props.path}  exact={props.exact} component={props.component} />) : 
        <GoogleLogin
            clientId={clientId}
            onFailure={onFailure}
            onSuccess={onSuccess}
            buttonText="Login"
            cookiePolicy="single_host_origin"
            isSignedIn={true}
        />;
};
export  default  PrivateRoute;