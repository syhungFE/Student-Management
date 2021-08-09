import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { User } from 'models';

export interface LoginPayload{
    username: string;
    password: string;
}
export interface AuthState{
    isLogged: boolean;
    logging: boolean;// set loading when authenticate user
    currentUser?: User
}
const initialState: AuthState ={
    isLogged: false,
    logging: false,
    currentUser: undefined
}

const authSlice = createSlice({
    name: 'auth', 
    initialState,
    reducers: {
        login(state, action: PayloadAction<LoginPayload>) {
            state.logging = true;
        },
        loginSuccess(state, action: PayloadAction<User>) {
            state.isLogged = true;
            state.logging = false;
            state.currentUser = action.payload;
        },
        loginFailed(state, action: PayloadAction<string>) {
            state.logging = false;
        },

        logout(state) {
            state.isLogged = false;
            state.currentUser = undefined;
        },
    }
})

// Actions
export const authActions = authSlice.actions;
// Selectors
export const selectIsLoggedIn = (state: RootState) => state.auth.isLogged;
export const selectIsLogging = (state: RootState) => state.auth.logging;
// Reducer
const authReducer = authSlice.reducer;
export default authReducer;