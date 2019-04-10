import { CommentInfoes } from './CommentData';
import { ContentData } from './ContentData';

export type PostInfo = {
  id: number;
  title: string;
  contentS3Key: string;
  writer: Writer;
  board: Board;
  likes: number;
  comments: CommentInfoes;
  isLiked: boolean;
  createdAt: Date;
}

export type PostData = {
  id: number;
  title: string;
  content: ContentData;
  writer: Writer;
  board: Board;
  likes: number;
  comments: CommentInfoes;
  isLiked: boolean;
  createdAt: Date;
};

export interface Writer {
  id: number;
  username: string;
  avatarUrl: string;
}

export interface Board {
  id: number;
  name: string;
}
