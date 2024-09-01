import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';  // Impor Router untuk navigasi
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { LoginPageForm } from './login.page.form';
import { Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { AppState } from 'src/store/AppState';
import { recoverPassword, recoverPasswordSuccess, recoverPasswordFail, login, loginSuccess, loginFail } from 'src/store/login/login.actions'; // Combined import
import { ToastController } from '@ionic/angular';
import { LoginState } from 'src/store/login/LoginState';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Subscription } from 'rxjs';
import { hide, show } from 'src/store/loading/loading.actions';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {

  form!: FormGroup;
  loginStateSubscription!: Subscription;

  constructor(private router: Router, private formBuilder: FormBuilder, private store: Store<AppState>,
    private toastController: ToastController, private authService: AuthService
  ) { }  // Injeksi Router

  ngOnInit() {
    this.form = new LoginPageForm(this.formBuilder).createForm();

    this.loginStateSubscription = this.store.select('login').subscribe(loginState => {
      this.onIsRecoveredPassword(loginState);
      this.onError(loginState);
      this.toggleLoading(loginState); // Passing loginState as an argument
      this.onIsLoggedIn(loginState);
    })
  }

  ngOnDestroy() {
    if (this.loginStateSubscription){
      this.loginStateSubscription.unsubscribe();
    }
  }

  private toggleLoading(loginState: LoginState) { // Added loginState parameter
    if (loginState.isLoggingIn || loginState.isRecoveringPassword) {
      this.store.dispatch(show());
    } else {
      this.store.dispatch(hide());
    }
  }

  private onIsLoggedIn(loginState: LoginState){
    if (loginState.isLoggedIn) {
      this.router.navigate(['home']);
    }
  }

  private onError(loginState: LoginState) {
    console.log('onError called with loginState:', loginState);  // Debug log
    if (loginState.error) {
      const toaster = this.toastController.create({
        position: 'bottom',
        message: loginState.error.message,
        color: 'danger'
      });
      toaster.then(toaster => toaster.present());
    }
  }

  private async onIsRecoveredPassword(loginState: LoginState) {
    console.log('onIsRecoveredPassword called with loginState:', loginState);  // Debug log
    if (loginState.isRecoveredPassword) {
      const toaster = await this.toastController.create({
        position: 'bottom',
        message: 'Recovery email sent',
        color: 'primary'
      });
      toaster.present();
    }
  }


  forgotEmailPassword() {
    this.store.dispatch(recoverPassword({email: this.form.get('email')?.value}));
  }

  // Method to handle user login - renamed to avoid conflict
  loginUser() {
    this.store.dispatch(login({email: this.form.get('email')?.value, password: this.form.get('password')?.value}));
  }

  register() {
    this.router.navigate(['register']);
  }

}
