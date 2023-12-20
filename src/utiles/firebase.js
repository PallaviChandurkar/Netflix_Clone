import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCFGSjfCjfQ7eHu2NLNOfrKMifMM0CIP7s",
  authDomain: "netflixgpt-46dea.firebaseapp.com",
  projectId: "netflixgpt-46dea",
  storageBucket: "netflixgpt-46dea.appspot.com",
  messagingSenderId: "837586233671",
  appId: "1:837586233671:web:23bc2426a7461376638462",
  measurementId: "G-KJZLTS6SYS"
};

const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const auth = getAuth();