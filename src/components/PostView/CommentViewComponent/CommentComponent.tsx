import React, { Component, ReactNode } from 'react';
import styled from 'styled-components';
import { getGlobalStateForReactComponent } from '../../../GlobalState/getGlobalState';
import { GlobalState } from '../../../GlobalState/globalState';
import { CommentInfo } from '../../../types/CommentData';
import CommentActions from '../../../GlobalState/ActionAndStates/CommentActions';
import { startRenderContent } from '../../ContentView/renderContent';
import CommentHeaderComponent from './CommentHeaderComponent';
import CommentFooterComponent from './CommentFooterComponent';
import CommentWriteComponent from '../CommentWriteComponent/CommentWriteComponent';

type CommentComponentProps = {
  postId: number;
  commentInfo: CommentInfo;
  postWriterId: number;
}

type CommentComponentStates = {
  isWriting: boolean;
}

type ContainerProps = {
  isSubComment: boolean;
}

const Container = styled.li`
  margin-bottom: 1em;
  margin-left: ${(props: ContainerProps) => (props.isSubComment ? '2em' : '')}
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

export default class CommentComponent
  extends Component<CommentComponentProps, CommentComponentStates> {
  private globalState: GlobalState = getGlobalStateForReactComponent(this);

  public constructor(props: CommentComponentProps) {
    super(props);

    this.state = {
      isWriting: false,
    };

    this.handleCancelWriting = this.handleCancelWriting.bind(this);
  }

  public handleCancelWriting(): void {
    this.setState({
      isWriting: false,
    });
  }

  public render(): ReactNode {
    const {
      postId,
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

    const {
      isWriting,
    } = this.state;

    return (
      <Container isSubComment={!!parentComment}>
        <CommentHeaderComponent
          commentInfo={commentInfo}
          postWriterId={postWriterId}
        />
        {
          parentComment
            ? <ParentCommentWriter>{`@${parentComment.writer.username}`}</ParentCommentWriter>
            : null
        }
        <Body>{startRenderContent(content, { maxImage: 1 })}</Body>
        <CommentFooterComponent commentInfo={commentInfo} />
        {
          isWriting
            ? (
              <CommentWriteComponent
                postId={postId}
                cancelWriting={this.handleCancelWriting}
                parentCommentId={id}
              />
            )
            : (
              <button
                type="button"
                onClick={() => { this.setState({ isWriting: true }); }}
              >
                글쓰기
              </button>
            )
        }
      </Container>
    );
  }
}
