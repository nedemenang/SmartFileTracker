import types from '../types/types';
import isEmpty from 'lodash/isEmpty';

const initialState = {
    isAuthenticated: false,
    currentUser: {},
}


export default (state = initialState, action) => {
    switch (action.type) {
        
        case types.SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                currentUser: action.payload,
            };
        
        case types.LOGIN_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.user),
                user: action.user,
                successMessage: action.successMessage,
            };
      
        case types.RECEIVE_AUTHENTICATED_USER:
            return Object.assign({}, state, {
                payload: user
            });

        default:
            return state;
    }
}