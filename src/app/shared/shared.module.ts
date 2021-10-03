import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
})
export class SharedModule {}
