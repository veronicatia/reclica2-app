import { createReducer, on, Action } from "@ngrx/store";
import { loginSuccess, loginFail, recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from "./login.actions";
import { LoginState } from "./LoginState";
import { AppInitialState } from "../AppInitialState";
import { login } from "./login.actions";

const initialState: LoginState = AppInitialState.login;

const reducer = createReducer(initialState,
    on(recoverPassword, currentState => {
        return {
            ...currentState,
            isRecoveringPassword: true,
            isRecoveredPassword: false
        };
    }),
    on(recoverPasswordSuccess, currentState => {
        return {
            ...currentState,
            error: null,
            isRecoveringPassword: false,
            isRecoveredPassword: true
        };
    }),
    on(recoverPasswordFail, (currentState, action) => {
        return {
            ...currentState,
            error: action.error,
            isRecoveredPassword: false,
            isRecoveringPassword: false
        };
    }),
    on(login, currentState => {
        return {
            ...currentState,
            isLoggingIn: true,
            isLoggedIn: false
        };
    }),
    on(loginSuccess, currentState => {
        return {
            ...currentState,
            isLoggedIn: true,
            isLoggingIn: false
        }
    }),
    on(loginFail, (currentState, action) => {
        return {
            ...currentState,
            error: action.error,
            isLoggedIn: false,
            isLoggingIn: false
        }
    })
)

export function loginReducer(state: LoginState, action: Action<string>) {
    return reducer(state, action);
}
