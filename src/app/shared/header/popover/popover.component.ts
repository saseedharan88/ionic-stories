import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { UserService } from 'src/app/data-access/src';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
  constructor(
    private popoverController: PopoverController,
    private _userService: UserService,
    private route: Router
  ) {}

  ngOnInit() {}

  logout() {
    this._userService.signOut();
    this.route.navigate(['/login']);
  }

  goTo(path) {
    this.route.navigate(['/' + path]);
  }

  dismissPopover() {
    this.popoverController.dismiss();
  }
}
