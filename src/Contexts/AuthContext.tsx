/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  UserInfo,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { query } from "express";
import { collection, where, getDocs } from "firebase/firestore";
import { IRequest } from "../Interfaces";

interface AuthContext {
  signup: (email: string, password: string) => Promise<any>;
  login: (email: string, password: string) => Promise<any>;
  logout: () => void;
  currentUser?: UserInfo;
  usersRequests: IRequest[];
  registerEmail: string;
  setRegisterEmail: (email: string) => void;
  registerPassword: string;
  setRegisterPassword: (password: string) => void;
  loginEmail: string;
  setLoginEmail: (email: string) => void;
  loginPassword: string;
  setLoginPassword: (password: string) => void;
  googleSignIn: () => void;
  passwordConfirmation: string;
  setPasswordConfirmation: (password: string) => void;
}

export const AuthContext = createContext<AuthContext>({
  signup: async () => {},
  login: async () => {},
  logout: () => {},
  currentUser: undefined,
  usersRequests: [],
  registerEmail: "",
  setRegisterEmail: () => Promise,
  registerPassword: "",
  setRegisterPassword: () => Promise,
  loginEmail: "",
  setLoginEmail: () => Promise,
  loginPassword: "",
  setLoginPassword: () => Promise,
  googleSignIn: () => Promise,
  passwordConfirmation: "",
  setPasswordConfirmation: () => Promise,
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: any) {
  const [currentUser, setCurrentUser] = useState<UserInfo>();
  const [usersRequests, setUsersRequests] = useState<IRequest[]>([]);
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setCurrentUser(currentUser as UserInfo);
    });
    return unsubscribe;
  }, [onAuthStateChanged, auth, currentUser]);

  	// // MOVE THIS SECTION TO USER CONTEXT
    //   useEffect(() => {
    //     getUserRequests();
    //   }, [currentUser]);

    //   const getUserRequests = async () => {

    //     const data = query(
    //       collection(db, 'requests'),
    //       where('toUser', '==', `${currentUser?.id}`)
    //     );

    //     const req = await getDocs(data);
    //     req.forEach((doc) => {
    //       let newRequest = {
    //         accepted: doc.data().accepted,
    //         createdAt: doc.data().createdAt,
    //         fromUser: doc.data().fromUser,
    //         toUser: doc.data().toUser,
    //         itemId: doc.data().itemId,
    //         priceTotal: doc.data().priceTotal,
    //       };
    //       setUsersRequests((reqs) => [...reqs, newRequest]);
    //     });
    //   };
    //   // END OF SECTION



  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const signup = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      setCurrentUser(user.user);
    } catch (error) {
      console.error(error);
    }
  };

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      setCurrentUser(currentUser);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setCurrentUser(undefined);
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
        usersRequests,
        registerEmail,
        setRegisterEmail,
        registerPassword,
        setRegisterPassword,
        loginEmail,
        setLoginEmail,
        loginPassword,
        setLoginPassword,
        googleSignIn,
        passwordConfirmation,
        setPasswordConfirmation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export default AuthProvider;
