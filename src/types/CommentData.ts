import { ContentData } from './ContentData';

export type CommentTreeRoot = CommentTreeElement[]
export type CommentInfoes = CommentInfo[];

export type CommentInfo = {
  id: number;
  writer: Writer;
  parentComment?: ParentComment;
  contentS3Key: string;
  likes: number;

  createdAt: Date;
}

export type CommentData = {
  id: number;
  writer: Writer;
  parentComment?: ParentComment;
  content: ContentData;
  likes: number;

  createdAt: Date;
};

export type CommentTreeElement = {
  id: number;
  writer: Writer;
  parentComment?: ParentComment;
  contentS3Key: string;
  likes: number;
  children?: CommentTreeElement[];

  createdAt: Date;
}

export interface Writer {
  id: number;
  username: string;
  avatarUrl: string;
}

export interface Post {
  id: number;
}

export interface ParentComment {
  id: number;
  writer: {
    username: string;
  };
}
