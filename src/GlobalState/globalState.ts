import { PostState, initialPostState } from './ActionAndStates/PostState';
import { BoardState, initialBoardState } from './ActionAndStates/BoardState';

export interface GlobalState {
  postState: PostState;
  boardState: BoardState;
}

export const initialGlobalState: GlobalState = {
  postState: initialPostState,
  boardState: initialBoardState,
};
