import React, { Component, ReactNode } from 'react';
import styled from 'styled-components';
import CommentActions from '../../../GlobalState/ActionAndStates/CommentActions';
import CommentEditorComponent from './CommentEditorComponent';
import { PuffBlot } from '../../../types/PuffBlots';

type CommentWritePageProps = {
  parentCommentId?: string;
  postId: number;
  cancelWriting: () => void;
}

const Container = styled.div`
  margin: 0px 0px;
`;

export default class CommentWritePage extends Component<CommentWritePageProps, {}> {
  private postEditorComponent: React.RefObject<CommentEditorComponent>
  = React.createRef<CommentEditorComponent>();

  private getContent(): PuffBlot[] {
    if (!this.postEditorComponent || !this.postEditorComponent.current) return [];
    const postEditorComponent = this.postEditorComponent.current;
    return postEditorComponent.getContent();
  }

  private postContent(): void {
    const {
      postId,
      parentCommentId,
    } = this.props;

    const content = this.getContent();
    CommentActions.writeComment(content, postId, parentCommentId);
  }

  public render(): ReactNode {
    const {
      cancelWriting,
    } = this.props;
    return (
      <Container>
        <CommentEditorComponent ref={this.postEditorComponent} />
        <button
          onClick={() => this.postContent()}
          type="button"
        >
          작성완료!
        </button>
        <button
          onClick={() => cancelWriting()}
          type="button"
        >
          작성취소
        </button>
      </Container>
    );
  }
}
