import { 
    AUTHENTICATED_USER,
    SUCCESSFUL_REGISTRATION,
    UNSUCCESSFUL_REGISTRATION,
    DELETE_ALERT,
    SUCCESSFUL_LOGIN,
    UNSUCCESSFUL_LOGIN,
    LOGOUT,

 } from '../../types';

const authReducer = (state, action) => {
    switch(action.type) {
        case SUCCESSFUL_REGISTRATION:
        case UNSUCCESSFUL_REGISTRATION:
        case UNSUCCESSFUL_LOGIN:
            return {
                ...state,
                message: action.payload,
                authenticated: false
            }
        case SUCCESSFUL_LOGIN:
            localStorage.setItem('shareit_token', action.payload);
            return {
                ...state,
                token: action.payload,
                authenticated: true
            }
        case DELETE_ALERT:
            return {
                ...state,
                message: null
            }
        case AUTHENTICATED_USER:
            return {
                ...state,
                user: action.payload,
                authenticated: true
            }
        case LOGOUT:
            localStorage.removeItem('shareit_token');
            return {
                ...state,
                user: null,
                token: null,
                authenticated: false
                 

            }   

        default:
            return state;

    }
}
export default authReducer;