import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup } from '@angular/forms';
import { from } from 'rxjs';
import { IUser } from 'src/app/data-access/src';
import { UserService } from 'src/app/data-access/src';
import { UsersFacade } from 'src/app/data-access/src/lib/state/users/users.facade';
import { NavController } from '@ionic/angular';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profile: FormGroup;
  currentUser: IUser;
  constructor(
    private formBuilder: FormBuilder,
    private _userService: UserService,
    private afAuth: AngularFireAuth,
    private _usersFacade: UsersFacade,
    private navCtrl: NavController
  ) {
    this.profile = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
    });
  }

  ngOnInit() {
    console.log('ngon');
    this._usersFacade.getCurrentUser().subscribe((user) => {
      console.log('her:', user);
      this.currentUser = user;
    });
  }

  profileUpdate() {
    console.log('in pf:', this.currentUser);
    const userProfile: IUser = {
      uid: this.currentUser.uid,
      firstName: this.profile.value.firstName,
      lastName: this.profile.value.lastName,
    };
    this._userService.updateUser(userProfile);
  }

  goHomePage() {
    this.navCtrl.navigateRoot('tabs/home');
  }
}
