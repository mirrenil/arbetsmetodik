/* eslint-disable */
import React, {
  createContext,
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
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

interface AuthContext {
  signup: (
    email: string,
    password: string,
    displayName: string
  ) => Promise<any>;
  login: (email: string, password: string) => Promise<any>;
  logout: () => void;
  currentUser?: User;
  googleSignIn: () => void;
}

export const AuthContext = createContext<AuthContext>({
  signup: async () => {},
  login: async () => {},
  logout: () => {},
  currentUser: undefined,
  googleSignIn: () => Promise,
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: any) {
  const [currentUser, setCurrentUser] = useState<User>();
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user as User);
    });
    return unsubscribe;
  }, [onAuthStateChanged, auth]);

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
   let test = await signInWithPopup(auth, provider);
    setCookie('user', auth.currentUser, {
      path: '/'
    })
    navigate(`/profile/${auth.currentUser?.uid}`);
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
      await createUserWithEmailAndPassword(auth, email, password).then(() => {
        if (auth.currentUser) {
          updateProfile(auth.currentUser, { displayName: displayName });
        }
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
      await signInWithEmailAndPassword(auth, email, password);

      if (auth.currentUser) {
        setCookie('user', auth.currentUser, {
          path: '/'
        })
        setCurrentUser(auth.currentUser);
        navigate(`/profile/${auth.currentUser?.uid}`);
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
        removeCookie('user',{path:'/'});
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
        googleSignIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export default AuthProvider;