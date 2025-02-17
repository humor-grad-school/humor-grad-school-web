import React, { Component, ReactNode } from 'react';
import styled from 'styled-components';
import { getGlobalStateForReactComponent } from '../../../GlobalState/getGlobalState';
import { GlobalState } from '../../../GlobalState/globalState';
import { startRenderContent } from '../../ContentView/renderContent';
import CommentHeaderComponent from './CommentHeaderComponent';
import CommentFooterComponent from './CommentFooterComponent';
import CommentWriteComponent from '../CommentWriteComponent/CommentWriteComponent';
import { CommentData } from '../../../GlobalState/ActionAndStates/CommentActions';

type CommentComponentProps = {
  postId: number;
  commentData: CommentData;
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
      commentData,
      postWriterId,
    } = this.props;

    const {
      id,
      parentComment,
    } = commentData;

    const {
      content,
    } = commentData;

    const {
      isWriting,
    } = this.state;

    return (
      <Container isSubComment={!!parentComment}>
        <CommentHeaderComponent
          commentData={commentData}
          postWriterId={postWriterId}
        />
        {
          parentComment
            ? <ParentCommentWriter>{`@${parentComment.writer.username}`}</ParentCommentWriter>
            : null
        }
        <Body>{startRenderContent(content, { maxImage: 1 })}</Body>
        <CommentFooterComponent commentData={commentData} />
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
