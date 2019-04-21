import React, { Component, ReactNode } from 'react';
import styled from 'styled-components';
import CommentActions from '../../../GlobalState/ActionAndStates/CommentActions';
import { unconfirmedBlot } from '../../../types/Blot';
import ContentEditorComponent from '../../ContentWrite/ContentEditorComponent';

type CommentWritePageProps = {
  parentCommentId?: string;
  postId: number;
  cancelWriting: () => void;
}

const Container = styled.div`
  margin: 0px 0px;
`;

export default class CommentWritePage extends Component<CommentWritePageProps, {}> {
  private contentEditorComponent: React.RefObject<ContentEditorComponent>
  = React.createRef<ContentEditorComponent>();

  private getContent(): unconfirmedBlot[] {
    if (!this.contentEditorComponent || !this.contentEditorComponent.current) return [];
    const contentEditorComponent = this.contentEditorComponent.current;
    return contentEditorComponent.getContent();
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
        <ContentEditorComponent
          ref={this.contentEditorComponent}
          allowedFormats={[
            'image',
          ]}
          contentLimit={{
            image: 1,
          }}
        />
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
