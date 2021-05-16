import React from 'react';
import ThemedButton from '../components/ThemedButton';
import firebase from 'firebase';

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
            <div className="m-auto">
                <ThemedButton onClick={openModal}>Login</ThemedButton> to keep track of information.
            </div>
        </div>
    );
}

export default LoginPage;