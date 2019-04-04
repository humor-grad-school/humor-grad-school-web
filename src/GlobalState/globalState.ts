import { PostState, initialPostState } from './ActionAndStates/PostState';
import { BoardState, initialBoardState } from './ActionAndStates/BoardState';
import { CommentState, initialCommentState } from './ActionAndStates/CommentState';
import { LoginState, initialLoginState } from './ActionAndStates/LoginStates';

export interface GlobalState {
  postState: PostState;
  boardState: BoardState;
  commentState: CommentState;
  loginState: LoginState;
}

export const initialGlobalState: GlobalState = {
  postState: initialPostState,
  boardState: initialBoardState,
  commentState: initialCommentState,
  loginState: initialLoginState,
};
