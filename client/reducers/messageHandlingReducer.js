import types from '../types/types';

const initialState = {
    success: '',
    error: '',
}


export default (state = initialState, action) => {
    switch (action.type) {
    
        case types.RECEIVE_ERROR:
            return {
                ...state,
                error: action.payload
            };

        case types.RECEIVE_SUCCESS:
            return {
                ...state,
                success: action.payload
            };

        default:
            return state;
    }
}