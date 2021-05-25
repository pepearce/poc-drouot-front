import * as actionTypes from './actionTypes'

export const login = (uuid) => ({
    type: actionTypes.LOGIN,
    payload: {
        uuid
    }
})

export const logout = () => ({
    type: actionTypes.LOGOUT
})