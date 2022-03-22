import {useState} from 'react';
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import { FileUpload } from 'primereact/fileupload';
import Progressbar from './ProgressBar';

export default function InputFile() {

    const chooseOptions = {label: 'Choose', icon: 'pi pi-fw pi-plus'};
    const uploadOptions = {label: 'Uplaod', icon: 'pi pi-upload', className: 'p-button-success'};
    const cancelOptions = {label: 'Cancel', icon: 'pi pi-times', className: 'p-button-danger'};

    const [file,setFile]=useState(null);
    const [error, setError] = useState('');
    const types=['image/png','image/jpeg']

    const myUploader = (e) => {
        const addedFile=e.files[0]
        if(addedFile && types.includes(addedFile.type)){
            setError('')
            setFile(addedFile);
        }else{
            setError('Type of file dont match')
            console.log(error)
        }
    }
    const handleSelect=()=> {
        setError('')
    }


    return ( 
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <FileUpload name="file" maxFileSize="1000000" accept="image/png,image/jpeg" customUpload uploadHandler={myUploader} onSelect={handleSelect} chooseOptions={chooseOptions} uploadOptions={uploadOptions} cancelOptions={cancelOptions}/>
                
                    {error&& <div className='alert alert-danger mt-3'>{error}</div>}
                    {file && <Progressbar file={file} setFile={setFile}/>}
                </div>
            </div>
        </div>
    );
}