import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

export function PrivateRoute(props: RouteProps){
    // check user has logged in 
    // if yes, show route
    // if no, redirect to Login Page
    let isLoggedIn = Boolean(localStorage.getItem('access_token'));
    if(!isLoggedIn) return <Redirect to='/login'/>

    return <Route { ...props }/>
}