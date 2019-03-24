export type ContentData = ContentElementData[];

export type PostInfo = {
  contentS3Key: string;
}

export type PostData = {
  content: ContentData;
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
