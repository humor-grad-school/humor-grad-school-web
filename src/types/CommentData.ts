export type CommentTreeRoot = CommentTreeElement[]
export type CommentInfoes = CommentInfo[];
export type ContentData = ContentElementData[];

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

export enum ContentElementDataType {
  Block = 'block',
  Inline = 'inline',
  Break = 'break',
  Text = 'text',
  Image = 'image',
}

export interface ContentElementData {
  type: ContentElementDataType;
  children?: ContentElementData[];
}

export interface BlockElementData extends ContentElementData {
  type: ContentElementDataType.Block;
}

export interface InlineElementData extends ContentElementData {
  type: ContentElementDataType.Inline;
}

export interface BreakElementData extends ContentElementData {
  type: ContentElementDataType.Break;
}

export interface TextElementData extends ContentElementData {
  type: ContentElementDataType.Text;
  content: string;
}

export interface ImageElementData extends ContentElementData {
  type: ContentElementDataType.Image;
  source: string;
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
