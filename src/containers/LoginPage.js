import React from 'react';
import ThemedButton from '../components/ThemedButton';
import firebase from 'firebase';
import collaborate from "../collaborate.svg";

function LoginPage(props) {

    var provider = new firebase.auth.GoogleAuthProvider();

    function openModal() {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
            return firebase.auth().signInWithPopup(provider).then((res) => {
                if (res) {
                    console.log("sucessfuly logged in", res);
                    props.setUser(res.user);
                }
            })
        })
    }

    return (
        <div className="d-flex vh-100">
            <div className="m-auto d-flex justify-content-center">
                <div className="w-50 d-flex">
                    <img src={collaborate} alt="collaborate" />
                </div>
                <div className="d-flex flex-column mr-4 ml-4 justify-content-center" style={{width: "35%"}}>
                    <h1 className="display-4 m-4">Let's not loose info after a Brainstorming session</h1>
                    <h2 className="ml-4 mr-4 mb-4">share notes for better collaboration</h2>
                    <ThemedButton className="ml-4" onClick={openModal} style={{height: "80px", width: "200px", fontSize: "40px"}}>Login</ThemedButton>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;