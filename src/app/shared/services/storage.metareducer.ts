import { Action, ActionReducer } from '@ngrx/store';
import { merge, pick, cloneDeep } from 'lodash-es';
import { MetaReducer } from '@ngrx/store/src/models';
import { LocalStorageService } from './local-storage.service';



export function storageMetaReducerFactory<S, A extends Action = Action>(
  saveKeys: string[],
  localStorageKey: string,
  storageService: LocalStorageService,
  grantedActions?: string[],
): MetaReducer<any> {
  let onInit = true; // after load/refresh…

  return (reducer: ActionReducer<S, A>): ActionReducer<S, A> => {
    return (state: S, action: A): S => {
      // reduce the nextState.
      const nextState = reducer(state, action);

      // init the application state.
      if (onInit) {
        onInit = false;
        const savedState = storageService.getSavedState(localStorageKey);
        return merge(cloneDeep(nextState), savedState);
      }
      if (grantedActions && grantedActions.includes(action.type)) {
        // save the next state to the application storage.
        const stateToSave = pick(nextState, saveKeys);
        storageService.setSavedState(stateToSave, localStorageKey);
      }
      return nextState;
    };
  };
}
