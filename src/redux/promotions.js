import * as ActionTypes from './ActionTypes';

export const Promotions = (state = { isLoading: true,//object replace array
                                        errMess: null,//properties seperated to make easier to read
                                        promotions: [] }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_PROMOTIONS:
            return {...state, isLoading: false, errMess: null, promotions: action.payload};

        case ActionTypes.PROMOTIONS_LOADING:
            return {...state, isLoading: true, errMess: null, promotions: []}//empty array bc not loaded yet

        case ActionTypes.PROMOTIONS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
            
        default:
            return state;
    }
};