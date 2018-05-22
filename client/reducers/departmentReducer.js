import types from '../types/types';

const initialState = {
    department: {},
    departments: [],
    selectedDepartment: {}
}


export default (state = initialState, action) => {
    switch (action.type) {
        case types.ADD_DEPARTMENT: 
            return Object.assign({}, state, {
                payload: action.department
            });

        case types.RECEIVE_DEPARTMENTS:
            return {
                ...state,
                departments: action.payload
            };

        case types.UPDATE_DEPARTMENT:
            return Object.assign({}, state, {
                department: deparment
            });

        case types.SELECT_DEPARTMENT:
            return Object.assign({}, state, {
                selectedDepartment: deparment
            });

        default:
            return state;
    }
}