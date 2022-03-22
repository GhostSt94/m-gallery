import React from "react";
import { useFirestore } from "../hooks/useFirestore";
import  ImageCard from "./ImageCard";
import { motion } from "framer-motion";

function ShowImages({setImageUrl}) {
    const docs= useFirestore();
    console.log(docs)

    return ( 
        <div className="container img-grid my-4">
            <div className="row justify-content-start">
                {docs && docs.map(doc => 
                    <motion.div layout whileHover={{opacity:1}} className="col-6 col-lg-3 my-2 img-wrap" key={doc.id}>
                        <ImageCard doc={doc} setImageUrl={setImageUrl}/>
                    </motion.div>
                )}
            </div>
        </div>
    );
}

export default ShowImages;