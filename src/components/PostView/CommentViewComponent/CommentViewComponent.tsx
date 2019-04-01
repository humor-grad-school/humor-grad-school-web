import React, { Component, ReactNode } from 'react';
import styled from 'styled-components';
import { CommentInfoes } from '../../../types/CommentData';
import CommentComponent from './CommentComponent';
import CommentNavigatorComponent from './CommentNavigatorComponent';

type CommentViewComponentProps = {
  comments: CommentInfoes;
}

type CommentViewComponentState = {
  isWriting: boolean;
  commentPageNum: number;
}

const Container = styled.div`
  padding-bottom: 8ex;
`;

const CommentList = styled.ul`
  list-style-type: none;
  margin: 0px;
  padding: 0px;
`;

function sliceComments(comments: CommentInfoes, pageNumber: number): CommentInfoes {
  const start = (pageNumber - 1) * 20;
  const end = pageNumber * 20;
  const slicedComments = comments.slice(start, end);
  return slicedComments;
}

function getMaxPageNumber(commentAmount: number): number {
  return Math.ceil(commentAmount / 20);
}

export default class CommentViewComponent
  extends Component<CommentViewComponentProps, CommentViewComponentState> {
  public constructor(props: CommentViewComponentProps) {
    super(props);

    const { comments } = this.props;

    this.maxPageNumber = getMaxPageNumber(comments.length);

    this.state = {
      isWriting: false,
      commentPageNum: this.maxPageNumber,
    };
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  private maxPageNumber: number;

  public handlePageChange(pageNumber: number): void {
    this.setState({
      commentPageNum: pageNumber,
    });
  }

  public render(): ReactNode {
    const {
      comments,
    } = this.props;
    const {
      commentPageNum,
    } = this.state;

    const slicedComments = sliceComments(comments, commentPageNum);

    const commentComponents = slicedComments.map((commentInfo) => {
      const key = `comment-component-${commentInfo.writer.username}-${commentInfo.createdAt}${Math.random()}`;
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
      <Container>
        <CommentNavigatorComponent
          pageNumber={commentPageNum}
          maxPageNumber={this.maxPageNumber}
          changePageNumber={this.handlePageChange}
        />
        <CommentList>
          {commentComponents}
          {isWriting ? 'im writing' : 'im just watching'}
        </CommentList>
        <CommentNavigatorComponent
          pageNumber={commentPageNum}
          maxPageNumber={this.maxPageNumber}
          changePageNumber={this.handlePageChange}
        />
      </Container>
    );
  }
}
