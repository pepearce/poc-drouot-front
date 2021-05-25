import * as actionTypes from '../actions/actionTypes'



const AuctionReducer = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.AUCTION :
            return action.payload.auction;
        default:
            return state;
    }
}

export default AuctionReducer
