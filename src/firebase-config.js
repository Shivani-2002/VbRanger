import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,

    // apiKey: "AIzaSyAalk_Y5xvrt353XNxGv1cS3tJujO-nL2c",
    // authDomain: "socialblog-28401.firebaseapp.com",
    // databaseURL: "https://socialblog-28401-default-rtdb.firebaseio.com",
    // projectId: "socialblog-28401",
    // storageBucket: "socialblog-28401.appspot.com",
    // messagingSenderId: "833306781345",
    // appId: "1:833306781345:web:d47e1b5154ec3b3bb932e0"

  
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);