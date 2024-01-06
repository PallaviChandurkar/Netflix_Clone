import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../utiles/firebase";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { addUser, removeUser } from "../utiles/userSlice";
import { CHOOSE_LANG, LOGO } from "../utiles/constants";
import { toggleGptSearchPage } from "../utiles/gptSlice";
import { changeLanguage } from "../utiles/configSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unSubscribe();
  }, []);

  const searchbar = useSelector((store)=>store.gpt.showGptSearchPage)

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchPage());
  }

  const handleLangClick = (e) => {
    dispatch(changeLanguage(e.target.value));
  }

  return (
    <div className="absolute w-screen z-10 bg-black md:bg-gradient-to-b from-black md:flex justify-between">
      <img className="w-36 py-4 mx-auto md:mx-0 md:w-52 md:py-5 md:px-8" src={LOGO} alt="logo" />
      {user && (
        <div className="flex p-3 md:p-2">
          {
            searchbar &&  <select className="cursor-pointer" onChange={handleLangClick}>
            {
              CHOOSE_LANG.map((lang) =>  <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)
            }
            </select>
          }
          <button onClick={handleGptSearchClick} className="bg-red-700 text-white mx-4 px-3 rounded-lg">
            {searchbar ? "Home Page" : "Gpt Search"}
          </button>
          <img alt="usericon" className="w-12 h-12" src={user?.photoURL} />
          <button onClick={handleSignOut} className="mx-3 md:mx-0 font-bold text-white">
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
