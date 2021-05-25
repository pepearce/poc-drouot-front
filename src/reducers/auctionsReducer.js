import * as actionTypes from '../actions/actionTypes'



const AuctionsReducer = (state = [], action) => {
    switch (action.type) {
        case actionTypes.AUCTIONS :
            return action.payload.auctions;
        default:
            return state;
    }
}

export default AuctionsReducer
