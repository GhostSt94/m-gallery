import React,{useEffect} from 'react';
import useStorage from '../hooks/useStorage';
import { ProgressBar } from 'primereact/progressbar';
import { Toast } from 'primereact/toast';


const Progressbar=({file, setFile})=>{
    const {url,progress}=useStorage(file)
    
    useEffect(() => {
        url && setFile(null)
    }, [url]);
    return(
        <>
            <ProgressBar value={progress}/>
        </>
    )
}
export default Progressbar;
