import { createStore, combineReducers } from 'redux';
import { CAMPSITES } from './campsites';
import { COMMENTS } from './comments';
import { PARTNERS } from './partners';
import { PROMOTIONS } from './promotions';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers ({
            campsites: CAMPSITES,
            comments: COMMENTS,
            partners: PARTNERS,
            promotions: PROMOTIONS
        })
    );

    return store;
};