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

const appReducer = ( state, action ) => {
    switch(action.type) {
        case SHOW_ALERT:
            return{
                ...state,
                file_message: action.payload
            }
        case DELETE_ALERT:
            return {
                ...state,
                file_message: null
            }
        case UPLOADING_FILE:
            return {
                ...state,
                uploading: true
            }
        case SUCCESSFUL_UPLOADING:
            return {
                ...state,
                name: action.payload.name,
                original_name: action.payload.original_name,
                uploading: null
            }
        case UNSUCCESSFUL_UPLOADING:
            return {
                ...state,
                file_message: action.payload,
                uploading: null
            }
        case SUCCESSFUL_LINK:
            return {
                ...state,
                url: action.payload
            }
        case CLEAN_STATE:
            return {
                ...state,
                file_message: null,
                name: '',
                original_name: '',
                uploading: null,
                downloads: 1,
                password: '',
                author: null,
                url: ''
            }

        case ADD_PASSWORD:
            return {
                ...state,
                password: action.payload
            }
        case ADD_DOWNLOAD:
            return {
                ...state,
                downloads: action.payload
            }
        default:
            return state;
    }
}
export default appReducer;