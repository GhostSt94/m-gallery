import { initializeApp } from "firebase/app";
import {getStorage, ref, deleteObject} from 'firebase/storage';
import { getFirestore,Timestamp,addDoc,collection, doc,deleteDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKBrhqQ8lR8PiBApdWxQs66-wX-Lpxhlg",
  authDomain: "philly-gram.firebaseapp.com",
  projectId: "philly-gram",
  storageBucket: "philly-gram.appspot.com",
  messagingSenderId: "523495420883",
  appId: "1:523495420883:web:9e84a43262e59924417526"
};
  
// Initialize Firebase
const app=initializeApp(firebaseConfig);
const storage=getStorage(app)
const db=getFirestore()
const timestamp=Timestamp.fromDate(new Date())

const addImg=(url,name)=>
{  addDoc(collection(db, "images"), {
    url,
    name,
    created_at:timestamp
  }).then(doc=>
  console.log("Document written with ID: ", doc.id)
  ).catch((e) =>
      console.error("Error adding document: ", e)
  )}

  const deleteImg=async(name,id)=>{
    const imgRef = ref(storage, `${name}`);
    // Delete the file
    deleteObject(imgRef).then(async () => {
      await deleteDoc( doc(db, "images",id))
    }).catch((error) => {
      console.log('error deleting '+error)
    });
  }



export {storage,addImg,db,deleteImg};