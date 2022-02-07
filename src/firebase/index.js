import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBNTyW7syQQQEelFhHD7HQjvFHf748fD-Y",
  authDomain: "realtime-newsfeed.firebaseapp.com",
  projectId: "realtime-newsfeed",
  storageBucket: "realtime-newsfeed.appspot.com",
  messagingSenderId: "44201415311",
  appId: "1:44201415311:web:cc6a3d9d4273db6b1896fa"
};

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)

export { auth }