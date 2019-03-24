export type ContentData = ContentElementData[];

export type PostInfo = {
  id: number;
  title: string;
  contentS3Key: string;
  writer: {
    username: string;
    avatarUrl: string;
  };
  board: {
    id: number;
    name: string;
  };
  createdAt: Date;
}

export type PostData = {
  id: number;
  title: string;
  content: ContentData;
  writer: Writer;
  board: Board;
  createdAtInMillis: number;
};

export enum ContentElementDataType {
  Text = 'text',
  Image = 'image',
}

export interface ContentElementData {
  type: ContentElementDataType;
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
  username: string;
  avatarUrl: string;
}

export interface Board {
  id: number;
  name: string;
}
