import * as actionTypes from '../actions/actionTypes'



const BidReducer = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.BID :
            return action.payload.bid;
        default:
            return state;
    }
}

export default BidReducer
