import React, { useReducer } from 'react';
import appContext from './appContext';
import appReducer from './appReducer';
import {
    SHOW_ALERT,
    DELETE_ALERT,
    UPLOADING_FILE,
    SUCCESSFUL_UPLOADING,
    UNSUCCESSFUL_UPLOADING,
    SUCCESSFUL_LINK,
    UNSUCCESSFUL_LINK,
    CLEAN_STATE,
    ADD_PASSWORD,
    ADD_DOWNLOAD
    
} from '../../types';

import axiosClient from '../../config/axios';

const AppState = ({children}) => {

    //Creamos el state inicial
    const initialState = {
        file_message: null,
        name: '',
        original_name: '',
        uploading: null,
        downloads: 1,
        password: '',
        author: null,
        url: ''
    }

    //creamos el dispatch & state
    const [state, dispatch] = useReducer(appReducer, initialState);


    //Mostrando una alerta
    const showAlert =  msg =>{
        dispatch({
            type: SHOW_ALERT,
            payload: msg
        })

        setTimeout(() => {
            dispatch({
                type: DELETE_ALERT,
            })    
        }, 3000);
    }

    //Funcion para subir archivos al servidor
    const filesUploading =  async (formData, oriname) => {
        dispatch({
            type: UPLOADING_FILE 
        });

        try {
            const result =  await axiosClient.post('/api/files', formData);
            console.log(result.data);
            dispatch({
                type: SUCCESSFUL_UPLOADING,
                payload: {
                    name: result.data.file,
                    original_name: oriname
                }
            }) 
        } catch (error) {
            console.log(error)
            dispatch({
                type: UNSUCCESSFUL_UPLOADING,
                payload: error.response.data.msg
            });
        }
    }
    
    //Funcion para crear el enlace una vez subido el archivo
    const createLink = async () => {
        console.log('creando el enlace....');

        const data = {
            name: state.name,
            original_name: state.original_name,
            downloads: state.downloads,
            password: state.password,
            author: state.author
        }
        try {
            const result = await  axiosClient.post('/api/links', data);
            console.log(result.data.msg);
            dispatch({
                type: SUCCESSFUL_LINK,
                payload: result.data.msg
            })
        } catch (error) {
            
        }
    }

    const cleanState = () => {
        dispatch({
            type: CLEAN_STATE,
        })
    }

    //Funcion para agregar el password del Archivo
    const  addPassword = password => {
        console.log('Agregando password....');
        dispatch({
            type: ADD_PASSWORD,
            payload: password
        })
    }

    //Funcion para agregar un numero de descargas
    const adddownload = downloads => {
        dispatch({
            type: ADD_DOWNLOAD,
            payload: downloads
        })

    }

    return (
        <appContext.Provider
            value={{
                file_message: state.file_message,
                name: state.name,
                original_name: state.original_name,
                uploading: state.uploading,
                downloads: state.downloads,
                password: state.password,
                author: state.author,
                url: state.url,
                showAlert,
                filesUploading,
                createLink,
                cleanState,
                addPassword,
                adddownload

            }}
        >
            {children}

        </appContext.Provider>
    )
}

export default AppState;