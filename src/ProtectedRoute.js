import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router'

const ProtectedRoute = ({component: Component, ...rest}) => {

    const isLoggedIn = useSelector(state => state.login.isLoggedIn);
    return(
            <Route {...rest} render={(props) => (isLoggedIn ? <Component {...props} /> : <Redirect to='/home'/> )}/>
    )
}



export default ProtectedRoute