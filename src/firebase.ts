import {initializeApp} from "firebase/app"
import {getDatabase} from "firebase/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

function StartFirebase(){
    const firebaseConfig = {
        apiKey: "AIzaSyAO0CwsN9FHYS2RpA0lFKMpAFaQoiDasMM",
        authDomain: "embeddead-system.firebaseapp.com",
        databaseURL: "https://embeddead-system-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "embeddead-system",
        storageBucket: "embeddead-system.appspot.com",
        messagingSenderId: "990080902954",
        appId: "1:990080902954:web:ee593a88c050ad25226053",
        measurementId: "G-Y3DLWL6H9Y"
    };
    const app = initializeApp(firebaseConfig);
    return getDatabase(app);


}

export const db = StartFirebase()