// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
	
};


let app;
if (firebase.apps.length === 0) {
	app = firebase.initializeApp(firebaseConfig);
} else {
	app = firebase.app()
}

const auth = firebase.auth()
const db = getFirestore();
const storage = getStorage();



export { auth, db, storage, ref , uploadBytes,  getDownloadURL };