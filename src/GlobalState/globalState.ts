import { PostState, initialPostState } from './ActionAndStates/PostState';
import { BoardState, initialBoardState } from './ActionAndStates/BoardState';
import { CommentState, initialCommentState } from './ActionAndStates/CommentState';

export interface GlobalState {
  postState: PostState;
  boardState: BoardState;
  commentState: CommentState;
}

export const initialGlobalState: GlobalState = {
  postState: initialPostState,
  boardState: initialBoardState,
  commentState: initialCommentState,
};
