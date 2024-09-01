import { createReducer, on, Action } from "@ngrx/store";
import { show, hide } from "./loading.actions";
import { LoadingState } from "./LoadingState";
import { AppInitialState } from "../AppInitialState";

const initialState: LoadingState = AppInitialState.loading;

const reducer = createReducer(initialState,
    on(show, state => ({
        ...state,
        show: true
    })),
    on(hide, state => ({
        ...state,
        show: false
    }))
);

export function loadingReducer(state: LoadingState | undefined, action: Action) {
    return reducer(state, action);
}
