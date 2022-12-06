import { collection, getDocs, query } from "firebase/firestore"
import { db } from "./firebase"

const fetchData =  async (collectionName: string, sortingID: string) => {
    const data = query(collection(db, collectionName));
    const req = await getDocs(data);
    req.forEach((doc) => {
        if(doc.id == sortingID) {
            return doc
        }
    })
}

export default fetchData;