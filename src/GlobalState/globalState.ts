import { PostState, initialPostState } from './ActionAndStates/PostState';

export interface GlobalState {
  postState: PostState;
}

export const initialGlobalState: GlobalState = {
  postState: initialPostState,
};
