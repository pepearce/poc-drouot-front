import * as actionTypes from '../actions/actionTypes'

const noUser = {
    id: '',
    firstName: '',
    lastName:'',
    address:'',
    email: '',
    role: '',
}

const UserReducer = (state = noUser, action) => {
    switch (action.type) {
        case actionTypes.CURRENT_USER :
            return action.payload.user;
        case actionTypes.LOGOUT:
            return noUser;
        default:
            return state;
    }
}

export default UserReducer
