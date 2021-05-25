import * as actionTypes from './actionTypes'


export const setAuction = (auction) => ({
    type: actionTypes.AUCTION,
    payload: {
        auction
    } 
})