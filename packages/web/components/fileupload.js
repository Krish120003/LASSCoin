import {useState} from 'react';

export default function fileupload() {
    
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, SetIsFilePicked] = useState(false);

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsSelected(true);
    };

    const handleSubmission = () => {
    };


    return (
    <div>
        <input type="file" name="file" onChange={changeHandler} />
        <div> 
            <button onClick={handleSubmission}>Submit</button>
        </div>
    </div>
    )
}
