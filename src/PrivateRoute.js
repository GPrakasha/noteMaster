import  React, { useState } from  "react";
import { Route } from  "react-router-dom";
import Notes from './containers/Notes.jsx';
import EditNote from './containers/EditNote';
import AddNote from "./containers/AddNote.js";
import LoginPage from "./containers/LoginPage.js";
import firebase from 'firebase';

function  PrivateRoute () {

    const [user, setUser] = useState();
    const [showLogin, setLoginPage] = useState(false);

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log(user, "user");
            setUser(user)
            setLoginPage(false);
        } else {
            setLoginPage(true);
            console.log(user, "user");
        }
    });

    return (user && !showLogin) ? (
        <>
            <Route path="/" exact>
                <Notes setUser={setUser}></Notes>
            </Route>
            <Route path="/notes/:id" exact>
                <EditNote></EditNote>
            </Route>
            <Route path="/add" exact>
                <AddNote>
                </AddNote>
            </Route>
        </>
    ) : showLogin ?
        <LoginPage setUser={setUser} />
     : (
        <div className="d-flex flex-row vh-100">
            <div className="spinner-grow text-primary m-auto" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
        
};
export default PrivateRoute;