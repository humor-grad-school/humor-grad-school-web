import React, { Component, ReactNode } from 'react';
import styled from 'styled-components';
import { CommentInfoes } from '../../../types/CommentData';
import CommentComponent from './CommentComponent';
import CommentNavigatorComponent from './CommentNavigatorComponent';
import CommentWriteComponent from '../CommentWriteComponent/CommentWriteComponent';

type CommentViewComponentProps = {
  postId: number;
  comments: CommentInfoes;
  postWriterId: number;
}

type CommentViewComponentState = {
  isWriting: boolean;
  commentPageNum: number;
}

const Container = styled.div`
  padding-bottom: 8ex;
`;

const CommentAmount = styled.div`
  font-size: 1.5em;
`;

const CommentList = styled.ul`
  list-style-type: none;
  margin: 0px;
  padding: 0px;
`;

const CommentWriteButton = styled.button`

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
      postId,
      comments,
      postWriterId,
    } = this.props;

    const {
      isWriting,
      commentPageNum,
    } = this.state;

    const slicedComments = sliceComments(comments, commentPageNum);

    const commentComponents = slicedComments.map((commentInfo) => {
      const key = `comment-component-${commentInfo.writer.username}-${commentInfo.createdAt}${Math.random()}`;
      return (
        <CommentComponent
          commentInfo={commentInfo}
          postWriterId={postWriterId}
          key={key}
        />
      );
    });

    return (
      <Container>
        <CommentAmount>{`총 ${comments.length}개의 댓글`}</CommentAmount>
        <CommentNavigatorComponent
          pageNumber={commentPageNum}
          maxPageNumber={this.maxPageNumber}
          changePageNumber={this.handlePageChange}
        />
        <CommentList>
          {commentComponents}
          {
            isWriting
              ? <CommentWriteComponent postId={postId} />
              : (
                <CommentWriteButton
                  type="button"
                  onClick={() => { this.setState({ isWriting: true }); }}
                >
                  글쓰기
                </CommentWriteButton>
              )
          }
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
