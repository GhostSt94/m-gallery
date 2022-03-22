import './index.css'
import InputFile from "./components/InputFile"
import ShowImages from "./components/ShowImages";
import NavBar from './components/NavBar';
import Modal from "./components/Modal";
import { useState } from 'react';


function App() {
const [imageUrl, setImageUrl] = useState(null);

  return (
    <div className="App">
      <NavBar/>
      <span className='d-block h5 fw-light text-center text-muted m-2'>Ajoutez une image</span>
      <InputFile />
      <hr className='my-4'/>
      <ShowImages setImageUrl={setImageUrl}/>
      {imageUrl && <Modal url={imageUrl} setImageUrl={setImageUrl}/>}
    </div>
  );
}

export default App;
