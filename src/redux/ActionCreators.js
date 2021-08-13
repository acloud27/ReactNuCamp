import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

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

export const fetchCampsites = () => dispatch => {//thunked
    dispatch(campsitesLoading());

    return fetch(baseUrl + 'campsites')
    //campsite=location of data we want, fetch must have url, call to fetch returns promise
        .then(response => {//error still response so promise filled
                if (response.ok) {
                    return response;//no error response
                } else {//if error response
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => {//2nd call back if no response at all
                const errMess = new Error(error.message);
                throw errMess;
            }
        )
        .then(response => response.json())
        //if promise met = .then method uses json method to convert response from json to JS(array campsites). json method returns new promise for which converted JS array is new response value when resolved allowing chain then method
        .then(campsites => dispatch(addCampsites(campsites)))
        //JS array campsites argument grabbed once promise resolves then dispatch campsites argument with addCampsites Action creator to be used as payload
        .catch(error => dispatch(campsitesFailed(error.message)));
};

export const campsitesLoading = () => ({
    type: ActionTypes.CAMPSITES_LOADING
});

export const campsitesFailed = errMess => ({
    type: ActionTypes.CAMPSITES_FAILED,
    payload: errMess
});

export const addCampsites = campsites => ({
    type: ActionTypes.ADD_CAMPSITES,
    payload: campsites
});

export const fetchComments = () => dispatch => {//thunk action creator
    return fetch(baseUrl + 'comments')
    //send fetch request to json server running at address stored in baseUrl and ask for comments resource returing promise for array of comments objects
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            }
        )
        .then(response => response.json())
        //.then accesses array as response if fetch successful uses json() to convert json into JS array
        .then(comments => dispatch(addComments(comments)))
        //comments dispatched to be added to redux store
        .catch(error => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = errMess => ({//not thunk just 1 arrow function creating object
    type: ActionTypes.COMMENTS_FAILED,
    payload: errMess
});

export const addComments = comments => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const fetchPromotions = () => dispatch => {//thunked
    dispatch(promotionsLoading());//call to dispatch

    return fetch(baseUrl + 'promotions')//call to fetch
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            }
        )
        .then(response => response.json())//convert response to JS array
        .then(promotions => dispatch(addPromotions(promotions)))//adds to store
        .catch(error => dispatch(promotionsFailed(error.message)));
};

export const promotionsLoading = () => ({
    type: ActionTypes.PROMOTIONS_LOADING
});

export const promotionsFailed = errMess => ({
    type: ActionTypes.PROMOTIONS_FAILED,
    payload: errMess
});

export const addPromotions = promotions => ({
    type: ActionTypes.ADD_PROMOTIONS,
    payload: promotions
});