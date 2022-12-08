/* eslint-disable */
import { collection, where, getDocs, query } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { auth, db } from "../firebase";
import { IRequest } from "../Interfaces";
import { useAuth } from "./AuthContext";

interface UserContextValue {
  myReceivedRequests: IRequest[];
  mySentRequests: IRequest[];
  setMyReceivedRequests?: () => void;
  setMySentRequests?: () => void;
}

export const UserContext = createContext<UserContextValue>({
  myReceivedRequests: [],
  mySentRequests: [],
  setMyReceivedRequests: () => [],
  setMySentRequests: () => [],
});

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }: any) {
  const [myReceivedRequests, setMyReceivedRequests] = useState<IRequest[]>([]);
  const [mySentRequests, setMySentRequests] = useState<IRequest[]>([]);
  const { currentUser } = useAuth();
  const [cookies, setCookie] = useCookies(["user"]);

  useEffect(() => {
    getMyReceivedRequests();
    getMySentRequests();
  }, []);

  const getMyReceivedRequests = async () => {
    let newList: IRequest[] = [];
    const requests = await getReqs("requests", "toUser");
    if (requests) {
      for (let req of requests) {
        newList.push(req);
      }
      return setMyReceivedRequests(newList);
    }
  };

  const getMySentRequests = async () => {
    let newList: IRequest[] = [];
    try {
      const requests = await getReqs("requests", "fromUserId");
      if (requests) {
        for (let req of requests) {
          newList.push(req);
        }
        return setMySentRequests(newList);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getReqs = async (dbCollection: string, property: string) => {
    const newReq: IRequest[] = [];

    try {
      const data = query(
        collection(db, `${dbCollection}`),
        where(`${property}`, "==", `${cookies.user.uid}`)
      );
      const req = await getDocs(data);
      req.forEach((doc) => {
        const req = {
          accepted: doc.data().accepted,
          createdAt: doc.data().createdAt,
          fromUserId: doc.data().fromUserId,
          fromUserName: doc.data().fromUserName,
          toUser: doc.data().toUser,
          itemId: doc.data().itemId,
          priceTotal: doc.data().priceTotal,
          id: doc.id,
        };
        newReq.push(req);
      });
      return newReq;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <UserContext.Provider
      value={{
        myReceivedRequests,
        mySentRequests
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
export default UserProvider;
