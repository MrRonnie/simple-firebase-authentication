import "./App.css";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "./firebase.init";
import { useState } from "react";

const auth = getAuth(app);

function App() {
  const [user, setUser] = useState({});
  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setUser(user);
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
      {/* {conditon? true : false} */}
      {user.email ? (
        <button onClick={handleSingOut}>Sing Out</button>
      ) : (
        <button onClick={handleGoogleSignIn}>Google Sing In</button>
      )}

      <h2>Name: {user.displayName}</h2>
      <p>Email ID: {user.email} </p>
      <img src={user.photoURL} alt="" />
    </div>
  );
}

export default App;
