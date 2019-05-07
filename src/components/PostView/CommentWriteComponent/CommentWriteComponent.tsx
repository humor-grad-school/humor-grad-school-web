import React, { Component, ReactNode } from 'react';
import styled from 'styled-components';
import CommentActions from '../../../GlobalState/ActionAndStates/CommentActions';
import { unconfirmedBlot } from '../../../types/Blot';
import ContentEditorComponent from '../../ContentWrite/ContentEditorComponent';
import { ErrorCode } from '../../../generated/ErrorCode';
import LoginActions from '../../../GlobalState/ActionAndStates/LoginActions';
import PostActions from '../../../GlobalState/ActionAndStates/PostActions';

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
    if (!this.contentEditorComponent || !this.contentEditorComponent.current) {
      return [];
    }
    const contentEditorComponent = this.contentEditorComponent.current;
    return contentEditorComponent.getContent();
  }

  private async writeComment(): Promise<void> {
    const {
      postId,
      parentCommentId,
    } = this.props;

    const content = this.getContent();

    // TODO: Rework it not to use try catch
    let errorCode = '';

    try {
      const response = parentCommentId
        ? await CommentActions.writeSubComment(content, postId, parentCommentId)
        : await CommentActions.writeComment(content, postId);

      if (response.isSuccessful) {
        PostActions.reloadPost(postId);
        return;
      }
    } catch (error) {
      errorCode = error;
    }

    switch (errorCode) {
      case ErrorCode.DefaultErrorCode.Unauthenticated: {
        alert('로그인이 필요해요');
        LoginActions.openOverlay();
        break;
      }

      default: {
        alert('알 수 없는 에러로 실패했어요');
        break;
      }
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
