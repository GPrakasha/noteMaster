import  React, { useState } from  "react";
import { Route } from  "react-router-dom";
import Notes from './Notes.jsx';
import EditNote from './EditNote';
import { GoogleLogin } from 'react-google-login';

function  PrivateRoute () {

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

    return user ? (
        <>
            <Route path="/" exact >
                <Notes></Notes>
            </Route>
            <Route path="/notes/:id" exact>
                <EditNote></EditNote>
            </Route>
        </>
    ) :
        <GoogleLogin
            className="m-auto"
            clientId={clientId}
            onFailure={onFailure}
            onSuccess={onSuccess}
            buttonText="Login"
            cookiePolicy="single_host_origin"
            isSignedIn={true}
        />;
};
export  default  PrivateRoute;