import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IUser } from '../../model/users.interface';
import { LoadUsers, SaveUser } from './users.action';
import { UsersPartialState } from './users.reducer';
import { usersQuery } from './users.selector';

@Injectable({
  providedIn: 'root',
})
export class UsersFacade {
  constructor(private store: Store<UsersPartialState>) {}
  currentUser$ = this.store.pipe(select(usersQuery.getCurrentUser));
  allUsers$ = this.store.pipe(select(usersQuery.getAllUsers));

  saveCurrentUser(user: IUser): void {
    console.log('save user');
    this.store.dispatch(new SaveUser(user));
  }

  loadAllUsers(): void {
    // Load all users into the store, by communicating to actual database.
    console.log('tst:');
    this.store.dispatch(new LoadUsers());
  }

  getAllUsers(): Observable<IUser[]> {
    // Fetch all users from store.
    return this.allUsers$;
  }

  getCurrentUser(): Observable<IUser> {
    // Fetch current users from store.
    return this.currentUser$;
  }
}
