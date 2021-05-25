import * as actionTypes from '../actions/actionTypes'

const LoginReducer = (state = {uuid:null, isLoggedIn:false}, action) => {
    switch (action.type) {
        case actionTypes.LOGIN :
            return {uuid:action.payload.uuid, isLoggedIn:true};
        case actionTypes.LOGOUT:
            return {uuid:null, isLoggedIn:false};
        default:
            return state;
    }
}

export default LoginReducer
