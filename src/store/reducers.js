import {SET_BACKERS, BACKER_DISPLAY_DETAILS, SET_DOMINANT_TEAM} from './actions';

const initialState = {
    backers: [],
    activeBacker: {
        name: 'HENK',
        contributed: '10',
        team: 'b'
    },
};

export default function appReducer (state = initialState, action) {
    switch (action.type) {
        case SET_BACKERS:
            return Object.assign({}, state, {
                backers: action.backers
            });

        case BACKER_DISPLAY_DETAILS:
            return Object.assign({}, state, {
                activeBacker: action.backer,
            });

        case SET_DOMINANT_TEAM:
            return Object.assign({}, state, {
                dominantTeam: action.team
            });

        default:
            return state;
    }
}
