import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';
import * as UsersAction from './users.action';

@Injectable()
export class UsersEffects {
  constructor(private actions$: Actions) {}
  //   @Effect()
  //   loadUsers$: Observable<Action> = this.actions$.pipe(
  //     ofType<UsersAction.LoadUsers>(UsersAction.UsersActionTypes.LOAD_USERS),
  //     withLatestFrom()
  //   );
}
