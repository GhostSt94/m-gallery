import { useState,useEffect } from 'react';
import { ref,uploadBytesResumable,getDownloadURL } from "firebase/storage";
import { storage,addImg} from "../firebase/config";

const useStorage=(file)=>{
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);

    useEffect(() => {
        //references
        
        const btn=document.querySelector('.p-fileupload-files button')
        const storageRef=ref(storage,file.name)
        // storageRef.put(file).on('state_changed',snap =>{
        //     let percentage=(snap.bytesTransferred / snap.totalBytes)*100
        //     setProgress(percentage)
        // },
        // (err)=>setError(err),
        // async ()=>{
        //     const url=await storageRef.getDownloadURL()
        //     setUrl(url)
        // }
        // )
        const uploadTask = uploadBytesResumable(storageRef, file);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed', 
        (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + Math.round(percentage) + '% done');
            setProgress(Math.round(percentage))
            // switch (snapshot.state) {
            // case 'paused':
            //     console.log('Upload is paused');
            //     break;
            // case 'running':
            //     console.log('Upload is running');
            //     break;
            // }
        }, 
        (error) => {
            // Handle unsuccessful uploads
            switch (error.code) {
                case 'storage/unauthorized':
                  // User doesn't have permission to access the object
                  setError('storage/unauthorized')
                  break;
                case 'storage/canceled':
                  // User canceled the upload
                  setError('storage/canceled')
                  break;
                
                // ...
          
                case 'storage/unknown':
                  // Unknown error occurred, inspect error.serverResponse
                  setError('storage/unknown')
                  break;
            }
            console.log(error)
        }, 
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUrl(downloadURL)
            console.log('File available at', downloadURL);
            addImg(downloadURL,file.name)
            btn && btn.click()
        })});
        
    }, [file]);

    return{url,progress,error}

}
export default useStorage