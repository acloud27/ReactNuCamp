import * as ActionTypes from './ActionsTypes';

export const Promotions = (state = { isLoading: true,
                                        errMess: null,
                                        promotions: [] }, action) => {
    switch (action.type) {
        case ActionType.ADD_PROMOTIONS:
            return {...state, isLoading: false, errMess: null, promotions: action.payload};

        case ActionType.PROMOTIONS_LOADING:
            return {...state, isLoading: true, errMess: null, promotions: []}

        case ActionType.PROMOTIONS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};
