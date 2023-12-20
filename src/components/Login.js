import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utiles/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utiles/firebase";
// import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utiles/userSlice";

const Login = () => {
  const [signInForm, setSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const toggleSignInForm = () => {
    setSignInForm(!signInForm);
  };

  const handleButtonClick = () => {
    //validate the form data
    //checkValidData;
    //console.log(email.current.value);
    //console.log(password.current.value);
    const message = checkValidData(email.current.value, password.current.value);
    //console.log(message);
    setErrorMessage(message);
    if (message) return;

    if (!signInForm) {
      // Sign Up Logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: "https://e0.pxfuel.com/wallpapers/900/942/desktop-wallpaper-cartoon-cartoon-new-cartoon-boy-cartoon-letest-cartoon-cute-cartoon-cute-bay-cartoon-kartoon-thumbnail.jpg",
          })
            .then(() => {
              // Profile updated!
              // ...
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              // navigate("/browse");
            })
            .catch((error) => {
              // An error occurred
              // ...
              setErrorMessage(error.message);
            });

          // console.log(user);
          //navigate("/browse");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
          // ..
        });
    } else {
      // Sign In Logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          //const user = userCredential.user;
          // console.log(user);
          //navigate("/browse");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/b4c7f092-0488-48b7-854d-ca055a84fb4f/5b22968d-b94f-44ec-bea3-45dcf457f29e/IN-en-20231204-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="logo"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute w-3/12 bg-black mx-auto mt-44 right-0 left-0 my-5 p-10 text-white bg-opacity-80 rounded-lg"
        autoComplete="off"
      >
        <h1 className="my-3 text-3xl font-semibold">
          {signInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!signInForm && (
          <input
            ref={name}
            className="w-full p-3 my-3 rounded-md bg-[#333]"
            type="text"
            placeholder="FullName"
          />
        )}
        <input
          ref={email}
          className="w-full p-3 my-3 rounded-md bg-[#333]"
          type="text"
          placeholder="email"
        />
        <input
          ref={password}
          className="w-full p-3 my-3 rounded-md bg-[#333]"
          type="password"
          placeholder="password"
        />
        <p className="text-red-600">{errorMessage}</p>
        <button
          className="w-full my-3 bg-red-700 py-3 rounded-md"
          onClick={handleButtonClick}
        >
          {signInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="my-3 cursor-pointer" onClick={toggleSignInForm}>
          {signInForm
            ? "New to Netflix? Sign up now"
            : "Already Sign Up? Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
