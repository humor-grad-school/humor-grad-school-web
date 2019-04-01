import { CommentData } from '../../types/CommentData';

export interface CommentState {
  comments: CommentData[];
}

export const initialCommentState: CommentState = {
  comments: [],
};
