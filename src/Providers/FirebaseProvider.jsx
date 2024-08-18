import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext,  useEffect,  useState } from "react";
import { toast } from "react-toastify";
import auth from "./furebase.config";



export const AuthContext =createContext(null)
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const FirebaseProvider = ({children}) => {
  const [user,setUser]=useState(null);
  const [loading,setLoading] =useState(true);

  //Register User 
  const RegisterUser =(email,password) =>{
    setLoading(true);
    return createUserWithEmailAndPassword(auth,email,password)
  }
  

  //Update User
  const updateUserProfile =(name,image) =>{
    return updateProfile(auth.currentUser,{
      displayName: name,
      photoURL: image
    })
  }

  //Login User
  const LoginUser=(email,password) =>{
    setLoading(true);
    return signInWithEmailAndPassword(auth,email,password)
  }
  //google Login
  const googleLogIn =() =>{
    setLoading(true);
        return signInWithPopup(auth,googleProvider)
  }
  //github Login
  const githubLogIn =() =>{
    setLoading(true);
        return signInWithPopup(auth,githubProvider)
  }

  //logout
  const LogOut = () =>{

    setUser(null)
    
    signOut(auth)
    .then(()=>{
      toast.success('log Out Done')
    })
  }
  
  //Observer
  useEffect(()=>{
    const unsubscribe=onAuthStateChanged(auth, (user) => {
      if (user) {
         setUser(user)
         
      } 
      setLoading(false);
    });

    return ()=> unsubscribe();
    
  },[])
  const AuthValues={
    RegisterUser,
    LoginUser,
    googleLogIn,
    githubLogIn,
    LogOut,
    user,
    updateUserProfile,
    setUser,
    loading

  }
  return (
  
         <AuthContext.Provider value={AuthValues}>
         {children} 
         </AuthContext.Provider>
   
  );
};

export default FirebaseProvider;