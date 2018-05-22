import types from '../types/types';

const initialState = {
    fileNotes: [],
    files: [],
    file: {},
    selectedFile: {},
    fileMovements: []
}


export default (state = initialState, action) => {
    switch (action.type) {
        case types.ADD_FILE: 
            return {
                file: action.payload
            };

        case types.UPDATE_FILE:
            return {
                ...state,
                file: action.payload
            };

        case types.RECIEVE_FILES:
            return {
                ...state,
                files: action.payload
            };

        case types.RECEIVE_FILES_BY_DEPARTMENT:
            return {
                ...state,
                files: action.payload
            };
        
        case types.RECEIVE_FILE_BY_ID:
            return {
                ...state,
                file: action.payload
            };

        case types.RECEIVE_FILE_BY_NO:
            return {
                ...state,
                file: action.payload
            };

        case types.ADD_FILE_NOTE:
            return {
                ...state,
                fileNote: action.payload
            };
        
        case types.ADD_FILE_MOVEMENT:
            return {
                ...state,
                fileMovement: action.payload
            };
        
        case types.RECEIVE_FILE_MOVEMENT_FOR_FILE:
            return {
                ...state,
                file: action.payload
            };

        case types.RECIEVE_FILE_NOTE_FOR_FILE:
            return {
                ...state,
                file: action.payload
            };

        case types.SELECT_FILE:
            return {
                ...state,
                selectedFile: action.payload
            };

        default:
            return state;
    }
}