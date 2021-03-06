import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService, UsersFacade } from 'src/app/data-access/src';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
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

  signup() {
    this._userService
      .signUp(this.credentials.value.email, this.credentials.value.password)
      .subscribe(
        (user) => {
          // Sign up success.
          console.log('user:', user);
          const userToSave = {
            uid: user.user.uid,
          };
          this._userService.createUser(userToSave);
          this._usersFacade.saveCurrentUser({ uid: user.user.uid });
          this.route.navigate(['/profile']);
        },
        (error) => {
          console.log('er', error);
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

  loginPage() {
    this.route.navigate(['/login']);
  }
}
