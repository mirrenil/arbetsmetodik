/* eslint-disable */
import {
  collection,
  where,
  getDocs,
  query,
  doc,
  getDoc,
} from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import { IRequest, IUser } from "../Interfaces";
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

  useEffect(() => {
    setMyReceivedRequests([]);
    setMySentRequests([])
    getMyReceivedRequests();
    getMySentRequests();
  }, [currentUser]);

  const getMyReceivedRequests = async () => {
    const requests = await getReqs("requests", "toUser");
    if (requests?.length) {
      requests.forEach((req) => {
        setMyReceivedRequests((reqs) => [...reqs, req]);
      });
    }
  };

  const getMySentRequests = async () => {
    const requests = await getReqs('requests', 'fromUserId');

    if (requests?.length) {
      requests.forEach((req) => {
        setMySentRequests((reqs) => [...reqs, req]);
      });
    }
  };

  const getReqs = async (dbCollection: string, property: string) => {
    const newReq: IRequest[] = [];
    try {
      const data = query(
        collection(db, `${dbCollection}`),
        where(`${property}`, "==", `${currentUser?.uid}`)
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
        mySentRequests,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
export default UserProvider;
