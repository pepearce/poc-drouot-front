import * as actionTypes from './actionTypes'


export const setAuctions = (auctions) => ({
    type: actionTypes.AUCTIONS,
    payload: {
        auctions: auctions
    } 
})