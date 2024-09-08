import { TestBed } from "@angular/core/testing";
import { Action, StoreModule } from "@ngrx/store";
import { AuthService } from 'src/app/services/auth/auth.service';
import { Observable, of, throwError } from "rxjs";
import { User } from "src/app/model/user/User";
import { EffectsModule } from "@ngrx/effects";
import { register, registerFail, registerSuccess } from "./register.actions";
import { UserRegister } from "src/app/model/user/UserRegister";
import { LoginEffects } from "../login/login.effects";



describe("Login effects", () => {
    let effects: LoginEffects;
    let actions$: Observable<Action>;
    let error = {error: 'error'};
    let user = new User();
    user.id = "anyUserId"

    let authServiceMock = {
      register(userRegister: UserRegister) {
        if (userRegister.email == "error@email.com") {
          return throwError(error);
        }
        return of({});
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

    it('should register return success', (done) => {
        actions$ = of(register({userRegister: new UserRegister}));

        effects.register$.subscribe((newAction: any) => {
            expect(newAction).toEqual(registerSuccess());
            done();
        })
    })
    it('should register return error', (done) => {
      const userRegister = new UserRegister();
      userRegister.email = "error@email.com";

        actions$ = of(register({userRegister}));

        effects.register$.subscribe((newAction: any) => {
            expect(newAction).toEqual(registerFail({error}));
            done();
        })
    })
  })
function provideMockActions(arg0: () => Observable<Action<string>>): any {
  throw new Error("Function not implemented.");
}

