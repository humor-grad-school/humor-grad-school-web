import React, { Component, ReactNode } from 'react';
import styled from 'styled-components';
import { getGlobalStateForReactComponent } from '../../../GlobalState/getGlobalState';
import { GlobalState } from '../../../GlobalState/globalState';
import { CommentInfo } from '../../../types/CommentData';
import CommentActions from '../../../GlobalState/ActionAndStates/CommentActions';
import { startRenderContent } from '../../ContentView/renderContent';
import CommentHeaderComponent from './CommentHeaderComponent';
import CommentFooterComponent from './CommentFooterComponent';

type CommentComponentProps = {
  commentInfo: CommentInfo;
  postWriterId: number;
}

type ContainerProps = {
  issub: 'true' | 'false';
}

const Container = styled.li`
  margin-bottom: 1em;
  margin-left: ${(props: ContainerProps) => (props.issub === 'true' ? '2em' : '')}
`;

const ParentCommentWriter = styled.span`
  color: #666;
  padding: 0px 0.5em;
  border-radius: 1em;
  background-color: #DDD;
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
      postWriterId,
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
        <CommentHeaderComponent
          commentInfo={commentInfo}
          postWriterId={postWriterId}
        />
        {
          parentComment
            ? <ParentCommentWriter>{`@${parentComment.writer.username}`}</ParentCommentWriter>
            : null
        }
        <Body>{startRenderContent(content)}</Body>
        <CommentFooterComponent commentInfo={commentInfo} />
      </Container>
    );
  }
}
