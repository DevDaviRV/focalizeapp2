import { initializeApp } from "firebase/app";
import { initializeFirestore, serverTimestamp, collection, getDocs } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider, getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyB5mwcm0S79TbCJk4X0jxqzPNEU_XPeK_Q",
  authDomain: "getitdone-fbba5.firebaseapp.com",
  projectId: "getitdone-fbba5",
  storageBucket: "getitdone-fbba5.appspot.com",
  messagingSenderId: "629219761277",
  appId: "1:629219761277:web:bd35e3c258a238effe6514",
};


const firebaseApp = initializeApp(firebaseConfig);

const db = initializeFirestore(firebaseApp, {
  ignoreUndefinedProperties: true,
});
const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);

const timestamp = serverTimestamp();
const googleProvider = new GoogleAuthProvider();


export { db, auth, storage, timestamp, collection, getDocs, googleProvider};
