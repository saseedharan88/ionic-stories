import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup } from '@angular/forms';
import { from } from 'rxjs';
import { IUser } from 'src/app/data-access/src';
import { UserService } from 'src/app/data-access/src';
import { UsersFacade } from 'src/app/data-access/src/lib/state/users/users.facade';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profile: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private _userService: UserService,
    private afAuth: AngularFireAuth,
    private _usersFacade: UsersFacade
  ) {
    this.profile = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
    });
  }

  ngOnInit() {
    // this._usersFacade.loadAllUsers();

    this.afAuth.onAuthStateChanged((currentUser) => {
      console.log('currentUser:', currentUser);
    });
  }

  profileUpdate() {
    console.log('he:', this.profile.value);
    const userProfile: IUser = {
      uid: '1',
      firstName: this.profile.value.firstName,
      lastName: this.profile.value.lastName,
    };
  }
}
