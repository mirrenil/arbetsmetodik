import { collection, where, getDocs, query } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import { IRequest } from "../Interfaces";
import { useAuth } from './AuthContext';


interface UserContextValue {
  usersRequests: IRequest[],
  setUsersRequests?: () => void,
}

export const UserContext = createContext<UserContextValue>({
  usersRequests: [],
  setUsersRequests: () => Promise,
})

export function useUser() {
    return useContext(UserContext);
}

export function UserProvider({ children }: any) { 
  const [usersRequests, setUsersRequests] = useState<IRequest[]>([])
  const { currentUser } = useAuth();

      useEffect(() => {
        getUserRequests();
        getAll()
      }, [currentUser]);

  
      const getAll = async () => {
        const data = query(collection(db, 'requests'));
        const req = await getDocs(data);
        req.forEach((doc) => {
        });
      }

      const getUserRequests = async () => {
          const data = query(
          collection(db, 'requests'),
          where('toUser', '==', `${currentUser?.uid}`)
        );
        const req = await getDocs(data);

        req.forEach((doc) => {
          const newRequest = {
            accepted: doc.data().accepted,
            createdAt: doc.data().createdAt,
            fromUser: doc.data().fromUser,
            toUser: doc.data().toUser,
            itemId: doc.data().itemId,
            priceTotal: doc.data().priceTotal,
            id: doc.id
          };
          setUsersRequests((reqs) => [...reqs, newRequest]);
        });
      };



    return (
        <UserContext.Provider
          value={{ 
            usersRequests,
          }}
        >
          {children}
        </UserContext.Provider>
      );
}
export default UserProvider;
