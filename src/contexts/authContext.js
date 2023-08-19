import React, { useContext, useState, useEffect, createContext } from 'react';
import { auth } from "../firebase";
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider,
  signOut
} from 'firebase/auth';

const AuthContext = createContext();

export function useAuth(){
  return useContext(AuthContext)
}

export function AuthProvider({children}) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user) localStorage.setItem("auth", JSON.stringify(user));
      setCurrentUser(user)
    })
    return unsubscribe;
  }, [])

  function googleSignUp(){
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(credential, token, user)
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        console.log(errorCode, errorMessage)
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  function logout(){
    signOut(auth).then(() => {
      // Sign-out successful.
      console.log("sign out successfully")
      localStorage.clear();
    }).catch((error) => {
      // An error happened.
      console.log("something went wrong", error);
    });
  }
  
  //value is object which contain of auth info
  const value = {
    currentUser,
    googleSignUp,
    logout
    // sending signup in context so that many component can use it.
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}