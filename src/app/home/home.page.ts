import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IStory, IUser, StoriesService, UserService } from '../data-access/src';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private stories: Observable<IStory[]>;
  private users: Observable<IUser[]>;

  constructor(
    private _storyService: StoriesService,
    private _userService: UserService,
    private route: Router
  ) {}

  ngOnInit() {
    this.stories = this._storyService.getStories();
    this.users = this._userService.getUsers();
  }
}
