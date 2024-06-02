const admin = require('firebase-admin');
const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/firestore');

const serviceAccount = require('./ecosortbin-firebase-adminsdk-o2jq5-d53b849f09.json');

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
// const auth = firebase.auth();

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://ecosortbin.firebaseio.com'
});



const db = admin.firestore();



module.exports = db;
