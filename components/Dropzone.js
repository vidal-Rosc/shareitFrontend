import React, { useCallback, useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import axiosClient from '../config/axios';
import appContext from '../context/app/appContext';
import authContext from '../context/auth/authContext';
import Formular from './Formular';


const Dropzone = () => {

    //Context de la App
    const AppContext = useContext(appContext);
    const { createLink, uploading ,showAlert, filesUploading } = AppContext;

    //Context de la Autenticacion
    const AuthContext = useContext(authContext);
    const { user, authenticated} = AuthContext;

    const onDropAccepted = useCallback ((acceptedFiles)  => {
        //console.log(acceptedFiles);
        //Creamos un form data, forma en que subimos los archivos.
        const formData = new FormData();
        formData.append('file', acceptedFiles[0]);

        //Definimos el nombre original del archivo
        console.log(acceptedFiles[0].path);
        const oriname = acceptedFiles[0].path;

        filesUploading(formData, oriname);
        // eslint-disable-line
    }, []);

    const onDropRejected = () => {
        showAlert('No se pudo subir el archivo. El limite es 1Mb, para acceder a mas beneficios, crea una cuenta')
    }


    //Extraemos contenido de dropzone
    //getRootprops = Returns the props you should apply to the root drop container you render
    //getInputprops = Returns the props you should apply to hidden file input you render
    //isDragActive = Bolean and check if active drag is in progesss
    //acceptedFiles = to read the  uploaded files
    //onDronp= it executes itself everytime you drag a file
    //onDropAccepted= will storage all the files that have been aproved after some rules (type, filesize, etc)
    //onDropRejected= will storage all the files that have NOT been aproved after some rules (type, filesize, etc)
    const {getRootProps, getInputProps, isDragActive, acceptedFiles} = useDropzone({onDropAccepted, onDropRejected, maxFiles: 1000000});

    const files = acceptedFiles.map( file => (
        <li 
            key={file.lastModified}
            className="bg-white flex-1 p-3 mb-4 pb-10 shadow-lg rounded">
            <p className="font-bold text-xl text-gray-600">{file.path}</p>
            <p className="text-sm text-gray-500">{(file.size / Math.pow(1024, 2)).toFixed(2)}Mb</p>
        </li>
    ) );


    return (  
        <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0  flex flex-col items-center text-center justify-center border-dashed border-gray-400 border-2 bg-gray-100 px-4">
                {
                    acceptedFiles.length > 0 ? 
                    (
                        <div className="mt-10 w-full">
                        <h3 className="text-2xl font-bold text-center mb-4 text-gray-700">Files:</h3>
                            <ul>
                                {files}
                            </ul>
                            {
                                authenticated ? <Formular /> : ""
                            }
                            { uploading ? 
                                <div className=" flex justify-center items-center">
                                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-500"></div>
                                </div> : (
                                <button
                                    type="button"
                                    className="bg-red-500  w-auto py-2 px-3 rounded-lg text-white font-bold my-10 hover:bg-red-600 uppercase"
                                    onClick= { () => createLink()}
                                >Create Link</button>
                                )}
                        </div>
                        
                    ) : (
                        <div {...getRootProps({className: 'dropzone w-full py-32'})}>
                            <input className="h-100" {...getInputProps()}/>
                            {
                                isDragActive ? <p className="text-2xl text-center  text-gray-600">Drop here</p>:
                                    <div className="text-center">
                                        <p className="text-2xl text-center  text-gray-500">Drag and drop here</p>
                                        <button
                                            type="button" 
                                            className="bg-red-500  w-auto py-2 px-3 rounded-lg text-white font-bold my-10 hover:bg-red-600 uppercase"
                                        >Select File</button>
                                    </div>
                            }   
                        </div>
                        )
                }
        </div>
    );
}
 
export default Dropzone;