import { useState,useEffect } from 'react';
import { onSnapshot, orderBy,query,collection } from "firebase/firestore";
import { db } from "../firebase/config";

const useFirestore=()=>{
    const [docs, setDocs] = useState([]);
    useEffect(() => {
        const q = query(collection(db, "images"), orderBy('created_at','desc'));
        const unsub=onSnapshot(q,
        (querySnapshot)=>{
          let documents=[];
          querySnapshot.forEach(doc => {
            documents.push({...doc.data(),id:doc.id})
          });
        //   console.log(documents);
          setDocs(documents)
        })

        return ()=>unsub()
    }, []);

    return docs;
}

export {useFirestore}