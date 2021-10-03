import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { appReducer } from 'src/app/data-access/src/lib/state/app.reducer';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    // StoreModule.forFeature('users', appReducer),
  ],
  declarations: [ProfilePage],
})
export class ProfilePageModule {}
