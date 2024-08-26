import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form(form: any) {
    throw new Error('Method not implemented.');
  }

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.navigate(['login']);
  }

  login(){
    this.router.navigate(['home']);
  }
  register(){
    this.router.navigate(['register']);
  }



}
