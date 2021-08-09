import { PayloadAction } from "@reduxjs/toolkit";
import { push } from "connected-react-router";
import { call, delay, fork, take, put } from "redux-saga/effects";
import { authActions, LoginPayload } from "./authSlice";

async function loginUser(credentials: LoginPayload) {
 return fetch('http://localhost:8080/login', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
 })
   .then(data => data.json())
}

function* handleLogin(payload: LoginPayload): any{
    try {
        // fake call api 
        let token = yield call(loginUser,payload);
        yield delay(2000);
        // fake get access token
        localStorage.setItem('access_token', token);
        yield put(authActions.loginSuccess({
            id: 1,
            username: 'Hung Nguyen'
        }))
        yield put(push('/admin')); 
    } catch (error) {
        yield put(authActions.loginFailed(error.message));
    }
};
function* handleLogout(){
    yield delay(1000);
    // remove access token
    localStorage.removeItem('access_token');
    yield put(push('/login'));
};

function* watchLoginFlow(){
    while(true){
        const isLoggedIn = Boolean(localStorage.getItem('access_token'));
        if(!isLoggedIn){
            const action: PayloadAction<LoginPayload> = yield take(authActions.login.type);
            yield fork(handleLogin,action.payload);
        }
        yield take(authActions.logout.type);
        // call is blocking effect -> wait handleLogout() finised -> 'access_token' has removed
        yield call(handleLogout);
    }
};

function* authSaga(){
    yield fork(watchLoginFlow);
}
export default authSaga;