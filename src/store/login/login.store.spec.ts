import { AppInitialState } from "../AppInitialState";
import { login, recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from "./login.actions";
import { loginReducer } from "./login.reducers";
import { LoginState } from "./LoginState";

import { loginFail, loginSuccess } from "./login.actions";
import { User } from "src/app/model/User";

describe("Login store", () => {

    it('recoverPassword', () => {
        const initialState: LoginState = AppInitialState.login;

        const newState = loginReducer(initialState, recoverPassword({email: "any@gmail.com"}));
        expect(newState).toEqual({
            ...initialState,
            error:null,
            isRecoveredPassword: false,
            isRecoveringPassword: true
        })
    })

    it('recoverPasswordSuccess', () => {
        const initialState: LoginState = AppInitialState.login;

        const newState = loginReducer(initialState, recoverPasswordSuccess());
        expect(newState).toEqual({
            ...initialState,
            error:null,
            isRecoveredPassword: true,
            isRecoveringPassword: false
        })
    })

    it('recoverPasswordFail', () => {
        const initialState: LoginState = AppInitialState.login;
        const error = {error:'error'}
        const newState = loginReducer(initialState, recoverPasswordFail({error}));
        expect(newState).toEqual({
            ...initialState,
            error,
            isRecoveredPassword: false,
            isRecoveringPassword: false
        })
    })

    it('login', () => {
        const initialState: LoginState = AppInitialState.login;
        const newState = loginReducer(initialState, login({email: "valid@gmail.com", password: "anyPassword"}));
        expect(newState).toEqual({
            ...initialState,
            error:null,
            isLoggedIn: false,
            isLoggingIn: true
        })
    })

    it('loginSuccess', () => {
        const initialState: LoginState = {
            ...AppInitialState.login,
            isLoggingIn: true
        };
        const user = new User();
        user.id = 'anyId';
        const newState = loginReducer(initialState, loginSuccess({user}));
        expect(newState).toEqual({
            ...initialState,
            error:null,
            isLoggedIn: true,
            isLoggingIn: false
        })
    })

    it('loginFail', () => {
        const initialState: LoginState = {
            ...AppInitialState.login,
            isLoggingIn: true
        };
        const error = {error:'error'};
        const newState = loginReducer(initialState, loginFail({error}));
        expect(newState).toEqual({
            ...initialState,
            error,
            isLoggedIn: false,
            isLoggingIn: false
        })
    })
})
