import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from './popover/popover.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title;

  constructor(public popoverController: PopoverController) {}

  ngOnInit() {}

  createPopover(event) {
    console.log('here !!!', event);
    this.popoverController
      .create({
        component: PopoverComponent,
        showBackdrop: false,
        translucent: true,
        event: event,
      })
      .then((popoverElement) => {
        popoverElement.present();
      });
  }
}
