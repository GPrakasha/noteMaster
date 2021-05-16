import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase';

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyB8fY9UWqXVnl475TTHglRaahRR2U_FaW0",
    authDomain: "notes-app-962d4.firebaseapp.com",
    databaseURL: "https://notes-app-962d4-default-rtdb.firebaseio.com",
    projectId: "notes-app-962d4",
    storageBucket: "notes-app-962d4.appspot.com",
    messagingSenderId: "569701998267",
    appId: "1:569701998267:web:395d2680b0c30dffca139e"
  });
} else {
  firebase.app(); // if already initialized, use that one
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
