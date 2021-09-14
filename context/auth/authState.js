import React, { useReducer } from 'react';
import authContext from "./authContext";
import authReducer from './authReducer';
import { 
    SUCCESSFUL_REGISTRATION,
    UNSUCCESSFUL_REGISTRATION,
    DELETE_ALERT,
    SUCCESSFUL_LOGIN,
    UNSUCCESSFUL_LOGIN,
    AUTHENTICATED_USER,
    LOGOUT,
} from '../../types';
import axiosClient from '../../config/axios';
import authToken from '../../config/token';


const AuthState  = ({children}) => {
    //Definimos el initialState
    const initialState = {
        token:  typeof window !== 'undefined' ? localStorage.getItem('shareit_token') : '',
        authenticated: null,
        user: null,
        message: null
    }

    //Definimos el reducer
    const [ state, dispatch] = useReducer( authReducer, initialState );

    //Definimos la funcion para registrar usuarios
    const registration =  async data => {
        try {
            const response = await axiosClient.post('/api/users', data);
            console.log(response.data.msg);
            dispatch({
                type: SUCCESSFUL_REGISTRATION,
                payload: response.data.msg
            });
         
        } catch (error) {
            console.log(error.response.data.msg)
            dispatch({
                type: UNSUCCESSFUL_REGISTRATION,
                payload: error.response.data.msg
            })
        }
        //Limpia el mensaje de alerta despues de 3 segundos
        setTimeout(() => {
            dispatch({
                type: DELETE_ALERT,
            });
        }, 3000)
    }


    //Funcion para iniciar sesion
    const login  = async data => {
        try {
            const response = await axiosClient.post('/api/auth', data);
            //console.log(response.data.token);
            dispatch({
                type: SUCCESSFUL_LOGIN,
                payload: response.data.token
            })
        } catch (error) {
            console.log(error.response.data.msg)
            dispatch({
                type: UNSUCCESSFUL_LOGIN,
                payload: error.response.data.msg
            })
        }
        //Limpia el mensaje de alerta despues de 3 segundos
        setTimeout(() => {
            dispatch({
                type: DELETE_ALERT,
            });
        }, 3000)
    }

    //Funcion para retornar el user en base al JWT
    const authenticatedUser = async () => {
        const token = localStorage.getItem('shareit_token');
        if(token) {
            authToken(token);
        }
        try {
            const response  = await  axiosClient.get('/api/auth');
            console.log(response.data.user);
            if(response.data.user){
                dispatch({
                    type: AUTHENTICATED_USER,
                    payload: response.data.user
                })
            }

        } catch (error) {
            console.log(error);
            dispatch({
                type: UNSUCCESSFUL_LOGIN,
                payload: error.response.data.msg
            })  
        }
    }

    //Funcion para cerrar sesion
    const logout =  ()  => {
        console.log('Cerrando sesion');
        dispatch({
            type: LOGOUT
          })
    }

    return (
        <authContext.Provider
            value={{
                token: state.token,
                authenticated: state.authenticated,
                user: state.user,
                message: state.message,
                authenticatedUser,
                registration,
                login,
                logout
            }}
        >
            { children }
        </authContext.Provider>
    )
}

export default AuthState;