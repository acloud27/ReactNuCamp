import * as ActionTypes from './ActionTypes';

export const Comments = (state = { errMess: null, comments: []}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COMMENTS:
            return {...state, errMess: null, comments: action.payload};

        case ActionTypes.COMMENTS_FAILED:
            return {...state, errMess: action.payload};

        case ActionTypes.ADD_COMMENT:
            const comment = action.payload;
            //id created in json-server automatically
            //date created in postComment action creator
            return {...state, comments: state.comments.concat(comment)};//spread and then update (concat only okay if simple array)
            
        default:
            return state;
    }
};
