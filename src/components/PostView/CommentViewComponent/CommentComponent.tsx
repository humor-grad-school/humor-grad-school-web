import React, { Component, ReactNode } from 'react';
import styled from 'styled-components';
import { getGlobalStateForReactComponent } from '../../../GlobalState/getGlobalState';
import { GlobalState } from '../../../GlobalState/globalState';
import { CommentInfo } from '../../../types/CommentData';
import CommentActions from '../../../GlobalState/ActionAndStates/CommentActions';
import renderCommentContent from './renderCommentContent';
import CommentHeaderComponent from './CommentHeaderComponent';
import CommentFooterComponent from './CommentFooterComponent';

type CommentComponentProps = {
  commentInfo: CommentInfo;
}

type ContainerProps = {
  issub: 'true' | 'false';
}

const Container = styled.li`
  margin-bottom: 1em;
  margin-left: ${(props: ContainerProps) => (props.issub === 'true' ? '2em' : '')}
`;

const Body = styled.div`
  padding: 0px 1em;

  p {
    margin: 0.5ex 0px;
  }
`;

export default class CommentComponent extends Component<CommentComponentProps, {}> {
  private globalState: GlobalState = getGlobalStateForReactComponent(this);

  public render(): ReactNode {
    const {
      commentInfo,
    } = this.props;

    const {
      id,
      parentComment,
    } = commentInfo;

    const commentData = this.globalState.commentState.comments[id];
    if (!commentData) {
      CommentActions.loadComment(commentInfo);
      return false;
    }

    const {
      content,
    } = commentData;

    return (
      <Container issub={parentComment ? 'true' : 'false'}>
        <CommentHeaderComponent commentInfo={commentInfo} />
        <Body>{renderCommentContent(content)}</Body>
        <CommentFooterComponent commentInfo={commentInfo} />
      </Container>
    );
  }
}
