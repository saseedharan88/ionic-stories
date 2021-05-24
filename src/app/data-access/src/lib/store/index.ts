import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { IAppState } from './stories.interface';
import { AppReducer } from './reducers/stories.reducer';

export const reducers: ActionReducerMap<IAppState> = {
  AppState: AppReducer,
};
export const metaReducers: MetaReducer<IAppState>[] = [];
