import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService, UsersFacade } from 'src/app/data-access/src';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: FormGroup;
  errorMessage: string;
  constructor(
    private formBuilder: FormBuilder,
    private _userService: UserService,
    private route: Router,
    private _usersFacade: UsersFacade
  ) {
    this.credentials = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {}

  login() {
    this._userService
      .login(this.credentials.value.email, this.credentials.value.password)
      .subscribe(
        (user) => {
          // Sign up success.
          console.log('login suc', user);
          this._usersFacade.saveCurrentUser({ uid: user.user.uid });
          this.route.navigate(['/profile']);
        },
        (error) => {
          console.log('login er', error);
          this.errorMessage = error.message;
        }
      );
  }

  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password');
  }

  signUpPage() {
    this.route.navigate(['/signup']);
  }
}
