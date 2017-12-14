export const SET_BACKERS = 'SET_BACKERS';

export function setBackers (backers){
    return {
        type: SET_BACKERS,
        backers
    }
}