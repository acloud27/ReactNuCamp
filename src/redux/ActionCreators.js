import * as ActionTypes from './ActionTypes';

export const addComment = (campsiteId, rating, author, text) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        //E6 allows for 
        //campsiteId,
        campsiteId: campsiteId,
        //rating,
        rating: rating,
        //author,
        author: author,
        //text
        text: text
        //shorthand
    }
});