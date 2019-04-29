import React, { Component, ReactNode } from 'react';
import styled from 'styled-components';
import CommentActions from '../../../GlobalState/ActionAndStates/CommentActions';
import { unconfirmedBlot } from '../../../types/Blot';
import ContentEditorComponent from '../../ContentWrite/ContentEditorComponent';
import LoginActions from '../../../GlobalState/ActionAndStates/LoginActions';

type CommentWritePageProps = {
  parentCommentId?: number;
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

  private async writeComment(): Promise<void> {
    const {
      postId,
      parentCommentId,
    } = this.props;

    const content = this.getContent();
    try {
      const commentId = await CommentActions.writeComment(content, postId, parentCommentId);
      if (commentId === -1) return;
    } catch (error) {
      if (error.message === '401') {
        alert('로그인이 필요합니다.');
        LoginActions.openOverlay();
        return;
      }
      alert('알 수 없는 에러로 실패했습니다.');
    }
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
            length: 1000,
          }}
        />
        <button
          onClick={() => this.writeComment()}
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
