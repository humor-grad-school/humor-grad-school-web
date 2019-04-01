import React, { Component, ReactNode } from 'react';
import styled from 'styled-components';
import { CommentInfoes } from '../../../types/CommentData';
import CommentComponent from './CommentComponent';

type CommentViewComponentProps = {
  comments: CommentInfoes;
}

type CommentViewComponentState = {
  isWriting: boolean;
}

const CommentList = styled.ul`
  list-style-type: none;
  margin: 0px;
  padding: 0px;
`;

export default class CommentViewComponent
  extends Component<CommentViewComponentProps, CommentViewComponentState> {
  public constructor(props: CommentViewComponentProps) {
    super(props);
    this.state = {
      isWriting: false,
    };
  }

  public render(): ReactNode {
    // TODO: Pagenation
    const {
      comments,
    } = this.props;

    const commentComponents = comments.map((commentInfo) => {
      const key = `comment-component-${commentInfo.writer.username}-${commentInfo.createdAt}`;
      return (
        <CommentComponent
          commentInfo={commentInfo}
          key={key}
        />
      );
    });

    const {
      isWriting,
    } = this.state;

    return (
      // TODO: header
      // TODO: navigator
      <CommentList>
        {commentComponents}
        {isWriting ? 'im writing' : 'im just watching'}
      </CommentList>
      // TODO: navigator
    );
  }
}
