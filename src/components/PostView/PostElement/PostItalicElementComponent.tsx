import React from 'react';
import './PostItalicElementComponent.scss';
import { ItalicElementData } from '../../../types/PostData';
import renderPostViewContent from '../renderPostViewContent';

export default function PostItalicElementComponent({
  italicElementData,
}: {
  italicElementData: ItalicElementData;
}): JSX.Element {
  const { children } = italicElementData;
  return <em>{children ? renderPostViewContent(children) : null}</em>;
}
