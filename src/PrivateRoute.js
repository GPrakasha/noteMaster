import  React, { useState } from  "react";
import { Route } from  "react-router-dom";
import Notes from './containers/Notes.jsx';
import EditNote from './containers/EditNote';
import { GoogleLogin } from 'react-google-login';
import AddNote from "./containers/AddNote.js";

function  PrivateRoute () {

    const [user, setUser] = useState();

    const clientId = "369522005554-u0be98s6qpeg7p4hlcuggu7j0h88a6la.apps.googleusercontent.com";

    function onSuccess(res) {
        setUser(res);
        localStorage.setItem("user_email", res.profileObj.email);
        console.log(res);
    }

    function onFailure(res) {
        console.log(res, "fAILED");
    }

    return user ? (
        <>
            <Route path="/" exact>
                <Notes></Notes>
            </Route>
            <Route path="/notes/:id" exact>
                <EditNote></EditNote>
            </Route>
            <Route path="/add" exact>
                <AddNote>
                </AddNote>
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