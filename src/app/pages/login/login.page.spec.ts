import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { Store, StoreModule } from '@ngrx/store';
import { loadingReducer } from 'src/store/loading/loading.reducers';
import { loginReducer } from 'src/store/login/login.reducers';
import { AppState } from 'src/store/AppState';  // Corrected import for AppState
import {
  recoverPassword,
  recoverPasswordFail,
  recoverPasswordSuccess,
  login,          // Add this import
  loginFail,       // Add this import
  loginSuccess
} from 'src/store/login/login.actions';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth/auth.service';

import { Observable, of } from 'rxjs';
import { throwError } from 'rxjs';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/model/user/User';


describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let router: Router;
  let page: DebugElement;  // Corrected type for page variable
  let store: Store<AppState>;
  let toastController: ToastController;
  let authService: AuthService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [
        IonicModule.forRoot(),
        AppRoutingModule,
        ReactiveFormsModule,
        StoreModule.forRoot({}),  // Corrected root store initialization
        StoreModule.forFeature('loading', loadingReducer),
        StoreModule.forFeature('login', loginReducer),
        AngularFireModule.initializeApp(environment.firebaseConfig)
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    router = TestBed.inject(Router);  // Use TestBed.inject for dependency injection
    store = TestBed.inject(Store);
    toastController = TestBed.inject(ToastController);

    component = fixture.componentInstance;
    page = fixture.debugElement;  // Corrected to DebugElement
  }));

  it('should create form on init', () => {
    component.ngOnInit();
    expect(component.form).not.toBeUndefined();
  });

  it('should go to register page on register', () => {
    spyOn(router, 'navigate');
    component.register();
    expect(router.navigate).toHaveBeenCalledWith(['register']);
  });

  it('should recover email/password on forgot email/password', () => {
    fixture.detectChanges();
    component.form.get('email')?.setValue("valid@gmail.com");
    page.query(By.css("#recoverPasswordButton")).nativeElement.click();  // Corrected usage of query

    store.select((state: AppState) => state.login).subscribe(loginState => {  // Corrected typing for store selection
      expect(loginState.isRecoveringPassword).toBeTruthy();
    })
    store.select((state: AppState) => state.loading).subscribe(loadingState => {  // Corrected typing for store selection
      expect(loadingState.show).toBeTruthy();
    });
  });


  it('given user is recovering password, when success, then hidde loading and show success message', () => {
    spyOn(toastController, 'create').and.returnValue(<any> Promise.resolve({present: () => {}}));

    fixture.detectChanges();
    store.dispatch(recoverPassword({email: "any@gmail.com"}));
    store.dispatch(recoverPasswordSuccess());
    store.select((state: AppState) => state.loading).subscribe(loadingState => {  // Corrected typing for store selection
      expect(loadingState.show).toBeFalsy();
    });
    expect(toastController.create).toHaveBeenCalledTimes(1);
  });

  it ('given user is recovering password, when fail, then hidde loading and show error message', () => {
    spyOn(toastController, 'create').and.returnValue(<any> Promise.resolve({present: () => {}}));

    fixture.detectChanges();
    store.dispatch(recoverPassword({email: "any@gmail.com"}));
    store.dispatch(recoverPasswordFail({error:"message"}));
    store.select((state: AppState) => state.loading).subscribe(loadingState => {  // Corrected typing for store selection
      expect(loadingState.show).toBeFalsy();
    });
    expect(toastController.create).toHaveBeenCalledTimes(1);
  })

  it ('should show loading and start login when logging in', () => {
    fixture.detectChanges();
    component.form.get('email')?.setValue("valid@gmail.com");
    component.form.get('password')?.setValue("anyPassword");
    page.query(By.css("#loginButton")).nativeElement.click();

    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeTruthy();
    })
    store.select('login').subscribe(loginState => {
      expect(loginState.isLoggingIn).toBeTruthy();
    })
  })

  it('given user is logging in, when success, then hide loading and send user to home page', () =>{
    spyOn(router, 'navigate');

    fixture.detectChanges();
    store.dispatch(login({email: "valid@gmail.com", password: "anyPassword"}));
    store.dispatch(loginSuccess({user: new User}));

    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeFalsy();
    })
    store.select('login').subscribe(loginState => {
      expect(loginState.isLoggingIn).toBeTruthy();
    })
    expect(router.navigate).toHaveBeenCalledWith(['home']);
  })

  it('given user is logging in, when fail, then hide loading and show error message', () =>{
    spyOn(toastController, 'create').and.returnValue(<any> Promise.resolve({present: () => {}}));

    fixture.detectChanges();
    store.dispatch(login({email: "valid@gmail.com", password: "anyPassword"}));
    store.dispatch(loginFail({error:"message"}));
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeFalsy();
    })

    expect(toastController.create).toHaveBeenCalledTimes(1);
  })

});
