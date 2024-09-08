import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { catchError, map, mergeMap, switchMap, tap } from "rxjs/operators";
import { AuthService } from "src/app/services/auth/auth.service";
import { recoverPassword, recoverPasswordSuccess, recoverPasswordFail, loginSuccess, loginFail, login } from "./login.actions";
import { ParseSourceFile } from "@angular/compiler";

@Injectable()
export class LoginEffects {
    register$: any;

    constructor(private actions$: Actions, private authService: AuthService) {

    }

    recoverPassword$ = createEffect(() => this.actions$.pipe(
        ofType(recoverPassword),
        switchMap((payload: {email: string}) => this.authService.recoverEmailPassword(payload.email).pipe(
            map(() => recoverPasswordSuccess()),
            catchError(error => of(recoverPasswordFail({error})))
        ))
    ))

    login$ = createEffect(() => this.actions$.pipe(
        ofType(login),
        switchMap((payload: {email: string, password: string})=>
        this.authService.login(payload.email, payload.password).pipe(
            map(user => loginSuccess({user})),
            catchError(error => of(loginFail({error})))
            )
        ))
    )
}
