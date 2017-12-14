import {SET_BACKERS} from './actions';

const initialState = {
    backers: []
};

export default function appReducer (state = initialState, action) {
    switch (action.type) {
        case SET_BACKERS:
            return Object.assign({}, state, {
                backers: action.backers
            });

        default:
            return state;
    }
}
