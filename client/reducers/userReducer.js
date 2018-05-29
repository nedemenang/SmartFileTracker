import types from '../types/types';

const initialState = {
    users: [],
    selectedUser:{},
    paginateData: {},
    user: {}
}


export default (state = initialState, action) => {
    switch (action.type) {
        case types.REGISTER_USER: 
            return {
                ...state,
                user: action.payload.userList.rows,
                paginateData: action.payload.paginateData
            };

        case types.RECEIVE_USER_LIST:
        return {
            ...state,
            users: action.payload

        };

        case types.UPDATE_USER:
            return {
                ...state,
                department: action.payload
            };

        case types.SELECT_USER:
            return  {
                ...state,
                selectedUser: action.payload
            };
        
        default:
            return state;
    }
}