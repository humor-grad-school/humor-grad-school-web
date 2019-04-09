import { CommentInfoes } from './CommentData';

export type ContentData = ContentElementData[];

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

export enum ContentElementDataType {
  Block = 'block',
  Inline = 'inline',
  Bold = 'bold',
  Italic = 'italic',
  Underline = 'underline',
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

export interface BoldElementData extends ContentElementData {
  type: ContentElementDataType.Bold;
}

export interface ItalicElementData extends ContentElementData {
  type: ContentElementDataType.Italic;
}

export interface UnderlineElementData extends ContentElementData {
  type: ContentElementDataType.Underline;
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

export interface Board {
  id: number;
  name: string;
}
