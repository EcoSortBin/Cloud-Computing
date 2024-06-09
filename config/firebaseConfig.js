const firebase = require('firebase/app');
require('firebase/auth');


const firebaseConfig = {
    apiKey: "AIzaSyD-_qMPh3jSIRDRmNenph-sBUXF0BVrDaU",
    authDomain: "ecosortbin.firebaseapp.com",
    projectId: "ecosortbin",
    storageBucket: "ecosortbin.appspot.com",
    messagingSenderId: "129635143436",
    appId: "1:129635143436:web:0969831f4aa036a8258329",
    measurementId: "G-TBGPPYM3WB"
};

firebase.initializeApp(firebaseConfig);

module.exports = firebase;