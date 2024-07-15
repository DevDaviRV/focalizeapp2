import { initializeApp } from "firebase/app";
import { initializeFirestore, serverTimestamp, collection, getDocs } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider, getAuth } from "firebase/auth";


// const firebaseConfig = {
//   apiKey: "AIzaSyB5mwcm0S79TbCJk4X0jxqzPNEU_XPeK_Q",
//   authDomain: "getitdone-fbba5.firebaseapp.com",
//   projectId: "getitdone-fbba5",
//   storageBucket: "getitdone-fbba5.appspot.com",
//   messagingSenderId: "629219761277",
//   appId: "1:629219761277:web:bd35e3c258a238effe6514",
// };

const firebaseConfig = {
  apiKey: "AIzaSyABzOI8znUJ-085fxkui_3O2o98S7nh8X0",
  authDomain: "focalizze-6efea.firebaseapp.com",
  projectId: "focalizze-6efea",
  storageBucket: "focalizze-6efea.appspot.com",
  messagingSenderId: "872320599507",
  appId: "1:872320599507:web:386e677e2d827919f89b26"
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
