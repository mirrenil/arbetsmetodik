/* eslint-disable @typescript-eslint/no-empty-function */
import React, {
  createContext,
  MutableRefObject,
  useContext,
  useEffect,
  useState,
} from "react";
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
} from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { async } from "@firebase/util";

interface AuthContext {
  signup: (
    email: MutableRefObject<null | HTMLInputElement>,
    password: MutableRefObject<null | HTMLInputElement>
  ) => Promise<any>;
  login: (email: string, password: string) => Promise<any>;
  logout: () => void;
  currentUser?: UserInfo;
  setRegisterEmail: (email: string) => void;
  setRegisterPassword: (password: string) => void;
  googleSignIn: () => void;
}

export const AuthContext = createContext<AuthContext>({
  signup: async () => {},
  login: async () => {},
  logout: () => {},
  currentUser: undefined,
  setRegisterEmail: () => Promise,
  setRegisterPassword: () => Promise,
  googleSignIn: () => Promise,
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: any) {
  const [currentUser, setCurrentUser] = useState<User>();
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  //     setCurrentUser(currentUser as User);
  //   });

  //   return unsubscribe;
  // }, [onAuthStateChanged, auth, currentUser]);

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider);
  };

  const addUserToDb = async () => {
    console.log(currentUser);

    if (currentUser?.email) {
      await setDoc(doc(db, "users", currentUser.uid), {
        displayName: currentUser?.displayName,
        email: currentUser?.email,
      });
    }
  };

  const signup = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      login(registerEmail, registerPassword);
    } catch (error) {
      console.error(error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);

      if (auth.currentUser) {
        setCurrentUser(auth.currentUser);
        addUserToDb();
      } else {
        setCurrentUser(undefined);
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
        setRegisterEmail,
        setRegisterPassword,
        googleSignIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export default AuthProvider;
