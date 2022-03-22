import { useState } from 'react';
import {deleteImg} from '../firebase/config'

function ImageCard({doc,setImageUrl}) {
    const [btnDelete, setBtnDelete] = useState(false);
    const DisplayBtn=()=>setBtnDelete(true)
    const HideBtn=()=>setBtnDelete(false)
    const handleClick=(e)=>{
        if(!e.target.classList.contains('btn')){
            setImageUrl(doc.url)
        }
    }
    const handleDelete=()=>{
        deleteImg(doc.name,doc.id)
    }

    return ( 
        <div className="image-card card shadow-sm position-relative" onMouseEnter={DisplayBtn} onMouseLeave={HideBtn} onClick={handleClick}>
            {btnDelete &&<button onClick={handleDelete} className="btn btn-outline-danger position-absolute top-0 end-0 m-2">X</button>}
            <img src={doc.url} alt={doc.id} />
        </div>
     );
}

export default ImageCard;