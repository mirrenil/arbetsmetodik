import { query } from "express";
import { collection, where, getDocs } from "firebase/firestore";
import { createContext, useContext, useEffect } from "react";
import { db } from "../firebase";
import { useAuth } from './AuthContext';


interface UserContextValue {

}

export const UserContext = createContext<UserContextValue>({

})

export function useUser() {
    return useContext(UserContext);
}

export function UserProvider({ children }: any) { 
  const { currentUser } = useAuth();

      useEffect(() => {
        // getUserRequests();
        console.log(currentUser)
      }, []);

      // const getUserRequests = async () => {
      //   const data = query(
      //     collection(db, 'requests'),
      //     where('toUser', '==', `${currentUser?.id}`)
      //   );

      //   const req = await getDocs(data);
      //   req.forEach((doc) => {
      //     let newRequest = {
      //       accepted: doc.data().accepted,
      //       createdAt: doc.data().createdAt,
      //       fromUser: doc.data().fromUser,
      //       toUser: doc.data().toUser,
      //       itemId: doc.data().itemId,
      //       priceTotal: doc.data().priceTotal,
      //     };
      //     setUsersRequests((reqs) => [...reqs, newRequest]);
      //   });
      // };


    return (
        <UserContext.Provider
          value={{ }}
        >
          {children}
        </UserContext.Provider>
      );
}
export default UserProvider;
