import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyB8fY9UWqXVnl475TTHglRaahRR2U_FaW0",
    authDomain: "notes-app-962d4.firebaseapp.com",
    databaseURL: "https://notes-app-962d4-default-rtdb.firebaseio.com",
    projectId: "notes-app-962d4",
    storageBucket: "notes-app-962d4.appspot.com",
    messagingSenderId: "569701998267",
    appId: "1:569701998267:web:395d2680b0c30dffca139e"
  };

firebase.initializeApp(config);

export default firebase;