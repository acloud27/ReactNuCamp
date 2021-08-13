import * as ActionTypes from './ActionTypes';

export const Comments = (state = { errMess: null, comments: []}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COMMENTS:
            return {...state, errMess: null, comments: action.payload};

        case ActionTypes.COMMENTS_FAILED:
            return {...state, errMess: action.payload};

        case ActionTypes.ADD_COMMENT:
            const comment = action.payload;
            comment.id = state.comments.length;//state stored in state.comments object (state.length fine if state just simple array)
            comment.date = new Date().toISOString();
            return {...state, comments: state.comments.concat(comment)};//spread and then update (concat if simple array)
            
        default:
            return state;
    }
};
