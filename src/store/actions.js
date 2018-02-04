export const SET_BACKERS = 'set_backers';
export const BACKER_DISPLAY_DETAILS = 'backer_display_details';
export const SET_DOMINANT_TEAM = 'set_dominant_team';
export const SET_TOP_BACKERS = 'set_top_backers';

export function backerDisplayDetails (backer) {
    return {
        type: BACKER_DISPLAY_DETAILS,
        backer
    }
}

export function setBackers (backers){
    return {
        type: SET_BACKERS,
        backers
    }
}

export function setDominantTeam (team) {
    return {
        type: SET_DOMINANT_TEAM,
        team
    }
}

export function setTopBackers (topBackers) {
    return {
        type: SET_TOP_BACKERS,
        topBackers,
    }
}