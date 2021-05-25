import * as actionTypes from './actionTypes'

export const setUser = (user) => ({
    type: actionTypes.CURRENT_USER,
    payload: {
        user:
        {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address,
            email: user.email,
            role: user.role
        }
    } 
})