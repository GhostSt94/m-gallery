function Modal({url,setImageUrl}) {
    const handleClick=(e)=>{
        if(e.target.classList.contains('bg-modal')){
            setImageUrl(null)
        }
    }
    return ( 
        <div className="bg-modal" onClick={handleClick}>
            <img src={url} alt="img" className="position-absolute top-50 start-50 translate-middle"/>
        </div>
    );
}

export default Modal;