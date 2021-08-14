import * as ActionTypes from './ActionTypes';

export const Partners = (state = { isLoading: true,//object replace array
                                        errMess: null,//properties seperated to make easier to read
                                        partners: [] }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_PARTNERS:
            return {...state, isLoading: false, errMess: null, partners: action.payload};

        case ActionTypes.PARTNERS_LOADING:
            return {...state, isLoading: true, errMess: null, partners: []}//empty array bc not loaded yet

        case ActionTypes.PARTNERS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};