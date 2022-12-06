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
import { auth } from "../firebase";
interface AuthContext {
  signup: (
    email: MutableRefObject<null | HTMLInputElement>,
    password: MutableRefObject<null | HTMLInputElement>
  ) => Promise<any>;
  login: (
    email: MutableRefObject<null | HTMLInputElement>,
    password: MutableRefObject<null | HTMLInputElement>
  ) => Promise<any>;
  logout: () => void;
  currentUser?: UserInfo;
  setRegisterEmail: (email: string) => void;
  setRegisterPassword: (password: string) => void;
  setLoginEmail: (email: string) => void;
  setLoginPassword: (password: string) => void;
  googleSignIn: () => void;
}

export const AuthContext = createContext<AuthContext>({
  signup: async () => {},
  login: async () => {},
  logout: () => {},
  currentUser: undefined,
  setRegisterEmail: () => Promise,
  setRegisterPassword: () => Promise,
  setLoginEmail: () => Promise,
  setLoginPassword: () => Promise,
  googleSignIn: () => Promise,
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: any) {
  const [currentUser, setCurrentUser] = useState<User>();
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setCurrentUser(currentUser as User);
    });

    return unsubscribe;
  }, [onAuthStateChanged, auth, currentUser]);

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
      setLoginEmail(registerEmail), setLoginPassword(registerPassword);
      login();
    } catch (error) {
      console.error(error);
    }
  };

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      if (auth.currentUser) {
        setCurrentUser(auth.currentUser);
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
        setLoginEmail,
        setLoginPassword,
        googleSignIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export default AuthProvider;
