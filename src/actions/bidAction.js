import * as actionTypes from './actionTypes'


export const setBid = (bid) => ({
    type: actionTypes.BID,
    payload: {
        bid
    } 
})