const firebaseConfig = {
    apiKey: "AIzaSyBjwoB-wYslKQO3GXPmPC5O8uLXFZsXNIQ",
    authDomain: "chengkangzai.firebaseapp.com",
    databaseURL: "https://chengkangzai.firebaseio.com",
    projectId: "chengkangzai",
    storageBucket: "chengkangzai.appspot.com",
    messagingSenderId: "769517222834",
    appId: "1:769517222834:web:ca371a76889970cbeb02ab",
    measurementId: "G-1CLH75RHL7"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function logout() {
    firebasefirebase.auth().signOut()
        .then(function() {
            window.location.href = "/index.html";
        }).catch(function(error) {
            console.log("Sth wrong happened " + error);
        });
}