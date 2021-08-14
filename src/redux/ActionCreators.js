import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const fetchCampsites = () => dispatch => {//thunked
    dispatch(campsitesLoading());

    return fetch(baseUrl + 'campsites')
    //campsite=location of data we want, fetch must have url, call to fetch returns promise
        .then(response => {
            //error still response so promise filled
            //so this .then() will run bad or good bc promise resolved not rejected since bad still response
                if (response.ok) {//set to true if response btwn server in successful range 200-299 (validation)
                    return response;//no error response
                } else {//if error response
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    //status and statusText built-in properties used to make error more informative
                    error.response = response;
                    throw error;
                }
            },
            error => {//2nd call back if no response at all aka first .then() rejected promise
                const errMess = new Error(error.message);
                throw errMess;
            }
        )
        .then(response => response.json())
        //if promise met = .then method uses json method to convert response from json to JS(array campsites). json method returns new promise for which converted JS array is new response value when resolved allowing chain then method
        .then(campsites => dispatch(addCampsites(campsites)))
        //JS array campsites argument grabbed once promise resolves then dispatch campsites argument with addCampsites Action creator to be used as payload
        .catch(error => dispatch(campsitesFailed(error.message)));
        //catches errors thrown above or if any other promises in promise-chain rejected
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

export const addComment = comment => ({//update local redux store
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const postComment = (campsiteId, rating, author, text) => dispatch => {//thunked asyncronise call to fetch
    
    const newComment = {
        campsiteId: campsiteId,
        rating: rating,
        author: author,
        text: text
    };
    newComment.date = new Date().toISOString();

    return fetch(baseUrl + 'comments', {
            //optional second agrument passed as object
            method: "POST",//specifices request method (default is "GET")
            body: JSON.stringify(newComment),//json encoded version of object newComment above
            headers: {
            //needs to be object to hold 1/more headers
                "Content-Type": "application/json"//server knows to expect body to be formated as json
            }
        })
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => { throw error; }//throws to next catch block
        )
        .then(response => response.json())
        .then(response => dispatch(addComment(response)))
        .catch(error => {
            console.log('post comment', error.message);
            //post comment to let us know err coming from post comment action creator
            alert('Your comment could not be posted\nError: ' + error.message);
        });
};

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

export const fetchPartners = () => dispatch => {//thunked
    dispatch(partnersLoading());//call to dispatch

    return fetch(baseUrl + 'partners')//call to fetch
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
        .then(partners => dispatch(addPartners(partners)))//adds to store
        .catch(error => dispatch(partnersFailed(error.message)));
};

export const partnersLoading = () => ({
    type: ActionTypes.PARTNERS_LOADING
});

export const partnersFailed = errMess => ({
    type: ActionTypes.PARTNERS_FAILED,
    payload: errMess
});

export const addPartners = partners => ({
    type: ActionTypes.ADD_PARTNERS,
    payload: partners
});

export const postFeedback = (feedback) => () => {//thunked asyncronise call to fetch

    return fetch(baseUrl + 'feedback', {
            //optional second agrument passed as object below
            method: "POST",//specifices request method (default is "GET")
            body: JSON.stringify(feedback),//json encoded version of object newComment above
            headers: {
            //needs to be object to hold 1/more headers
                "Content-Type": "application/json"//server knows to expect body to be formated as json
            }
        })
        //each of these are callback functions
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;//this makes object include errMess as response
                    throw error;
                }
            },
            error => { throw error; }//throws to next catch block
        )
        .then(response => response.json())
        .then(response => {
            console.log('Feedback: ', response);
            alert('Thank you for your feedback!\n' + JSON.stringify(response));
        })
        .catch(error => {
            //console.error('feedback: ', error.message)
            console.log('feedback: ', error.message);
            //post comment to let us know err coming from post comment action creator
            alert('Your feedback could not be posted\nError: ' + error.message);
        });
};