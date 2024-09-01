import { TestBed } from "@angular/core/testing";
import { Action, StoreModule } from "@ngrx/store";

import { AuthService } from 'src/app/services/auth/auth.service';

import { LoginEffects } from "./login.effects";

import { Observable, of, throwError } from "rxjs";
import { recoverPassword, recoverPasswordSuccess, recoverPasswordFail, loginSuccess, loginFail, login } from "./login.actions";
import { User } from "src/app/model/User";
import { EffectsModule } from "@ngrx/effects";



describe("Login effects", () => {
    let effects: LoginEffects;
    let actions$: Observable<Action>;
    let error = {error: 'error'};
    let user = new User();
    user.id = "anyUserId"

    let authServiceMock = {
        recoverEmailPassword: (email: string) => {
            if (email == 'error@gmail.com') {
                return throwError(error);
            }
            return of ({});
        },
        login: (email: string, password: string) => {
            if (email == 'error@gmail.com') {
                return throwError(error);
            }
            return of (user);
        }
    }

    beforeEach(() => {
        TestBed.configureTestingModule(
            {
                imports: [
                    StoreModule.forRoot([]),
                    EffectsModule.forRoot([]),
                    EffectsModule.forFeature([
                        LoginEffects
                    ])
                ],
                providers: [
                    provideMockActions(() => actions$)
                ]
            }).overrideProvider(AuthService, {useValue: authServiceMock});

        effects = TestBed.inject(LoginEffects);
    })

    it('should recover password with existing email return success', (done) => {
        actions$ = of(recoverPassword({email: "any@gmail.com"}));

        effects.recoverPassword$.subscribe(newAction => {
            expect(newAction).toEqual(recoverPasswordSuccess());
            done();
        })
    })

    it('should recover password with not existing email return an error', (done) =>{
        actions$ = of(recoverPassword({email: "error@gmail.com"}));

        effects.recoverPassword$.subscribe(newAction => {
            expect(newAction).toEqual(recoverPasswordFail(error));
            done();
        })
    })

    it('should login with valid credentials return success', (done) => {
        actions$ = of(login({email: "valid@gmail.com", password: "anyPassword"}));

        effects.login$.subscribe(newAction => {
            expect(newAction).toEqual(loginSuccess({user}));
            done();
        })
    })

    it('should login with invalid credentials return error', (done) => {
        actions$ = of(login({email: "error@gmail.com", password: "anyPassword"}));

        effects.login$.subscribe(newAction => {
            expect(newAction).toEqual(loginFail({error}));
            done();
        })
    })

})
function provideMockActions(arg0: () => Observable<Action<string>>): any {
  throw new Error("Function not implemented.");
}

