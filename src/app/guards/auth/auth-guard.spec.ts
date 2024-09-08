import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth-guard';
import { Store, StoreModule } from '@ngrx/store';
import { loginReducer } from 'src/store/login/login.reducers';
import { AppState } from '@capacitor/app';
import { loginSuccess } from 'src/store/login/login.actions';
import { User } from 'src/app/model/user/User';
import { Router, RouterModule } from '@angular/router';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let store: Store<AppState>;
  let router: Router

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        StoreModule.forRoot([]),
        StoreModule.forFeature('login', loginReducer)
      ]
    });
    guard = TestBed.inject(AuthGuard);
    store = TestBed.get(Store);
  });

  it('should allow logged user to access page', () => {
    store.dispatch(loginSuccess({user: new User()}));

    guard.canLoad().subscribe(isAllowed => {
      expect(isAllowed).toBeTruthy();
    })
  });

  it('should not allow access to page if user is not logged in', () => {
    guard.canLoad().subscribe(isAllowed => {
      expect(isAllowed).toBeFalsy();
    })
  });

  it('should not allow user to be sent to the login page', () => {
    spyOn(router, 'navigateByUrl')

    guard.canLoad().subscribe(isAllowed => {
      expect(router.navigateByUrl).toHaveBeenCalledWith('login');
    })
  });
});
