import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utiles/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utiles/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utiles/userSlice";
import { BG_URL, USER_AVATAR } from "../utiles/constants";

const Login = () => {
  const [signInForm, setSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const toggleSignInForm = () => {
    setSignInForm(!signInForm);
  };

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;

    if (!signInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
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
          className="h-screen object-cover md:w-screen"
          src={BG_URL}
          alt="logo"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute w-3/2 md:w-8/12 lg:w-3/12 bg-black md:mx-auto mt-44 right-0 mx-4 left-0 my-5 p-8 text-white bg-opacity-80 rounded-lg"
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
            placeholder="Please enter your name"
          />
        )}
        <input
          ref={email}
          className="w-full p-3 my-3 rounded-md bg-[#333]"
          type="text"
          placeholder="Please enter your email"
        />
        <input
          ref={password}
          className="w-full p-3 my-3 rounded-md bg-[#333]"
          type="password"
          placeholder="Enter your password"
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
