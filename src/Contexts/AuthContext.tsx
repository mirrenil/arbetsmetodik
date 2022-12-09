/* eslint-disable */
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  User,
  UserInfo,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface AuthContext {
  signup: (
    email: string,
    password: string,
    displayName: string
  ) => Promise<any>;
  login: (email: string, password: string) => Promise<any>;
  logout: () => void;
  currentUser?: UserInfo;
  googleSignIn: () => void;
  errorMessage: boolean;
}

export const AuthContext = createContext<AuthContext>({
  signup: async () => {},
  login: async () => {},
  logout: () => {},
  currentUser: undefined,
  googleSignIn: () => Promise,
  errorMessage: false,
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: any) {
  const [currentUser, setCurrentUser] = useState<User>();
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const navigate = useNavigate();

  errorMessage
    ? setTimeout(() => {
        setErrorMessage(false);
      }, 10000)
    : null;
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setCurrentUser(currentUser as User);
    });
    return unsubscribe;
  }, [onAuthStateChanged, auth, currentUser]);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
    navigate(`/profile/${auth.currentUser?.uid}`);
    toast.success("You are logged in successfully!", {
      autoClose: 1000,
      theme: "colored",
      delay: 3000,
    });
  };

  const addUserToDb = async (
    email: string,
    id: string,
    displayName: string
  ) => {
    await setDoc(doc(db, "users", id), {
      displayName: displayName,
      email: email,
    });
  };

  const signup = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          if (auth.currentUser) {
            updateProfile(auth.currentUser, { displayName: displayName });
            toast.success("Your account has been successfully registered", {
              autoClose: 1000,
              theme: "colored",
              delay: 3000,
            });
          }
        })
        .catch((error) => {
          setErrorMessage(true);
          toast.warn("Your account did not register", {
            autoClose: 1000,
            theme: "colored",
            delay: 3000,
          });
        });
      if (auth.currentUser && auth.currentUser.email) {
        addUserToDb(auth.currentUser.email, auth.currentUser.uid, displayName);
      }
      login(email, password);
    } catch (error) {
      console.error(error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password).catch((error) => {
        setErrorMessage(true);
      });

      if (auth.currentUser && !errorMessage) {
        setCurrentUser(auth.currentUser);
        navigate(`/profile/${auth.currentUser?.uid}`);
        toast.success("You are logged in successfully!", {
          autoClose: 1000,
          theme: "colored",
        });
      } else {
        setCurrentUser(undefined);
        toast.warn("Something went wrong!", {
          autoClose: 1000,
          theme: "colored",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setCurrentUser(undefined);
        toast.success("You are logged out", {
          autoClose: 500,
          pauseOnHover: true,
          theme: "colored",
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        signup,
        login,
        logout,
        currentUser,
        googleSignIn,
        errorMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export default AuthProvider;
