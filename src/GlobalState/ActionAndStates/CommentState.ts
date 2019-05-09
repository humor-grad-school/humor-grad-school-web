import { CommentData } from './CommentActions';

export interface CommentState {
  comments: CommentData[];
}

export const initialCommentState: CommentState = {
  comments: [],
};
