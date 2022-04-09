import "./App.css";
import {
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "./firebase.init";
import { useState } from "react";

const auth = getAuth(app);

function App() {
  const [user, setUser] = useState({});
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setUser(user);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleGithubSingIn = () => {
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleSingOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch((error) => {
        setUser({});
      });
  };
  return (
    <div className="App">
      {/* {condition? true : false} */}
      {user.uid ? (
        <button onClick={handleSingOut}>Sing Out</button>
      ) : (
        <>
          <button onClick={handleGoogleSignIn}>Google Sing In</button>
          <button onClick={handleGithubSingIn}>Github Sing In</button>
        </>
      )}

      <h2>Name: {user.displayName}</h2>
      <p>Email ID: {user.email} </p>
      <img src={user.photoURL} alt="" />
    </div>
  );
}

export default App;
