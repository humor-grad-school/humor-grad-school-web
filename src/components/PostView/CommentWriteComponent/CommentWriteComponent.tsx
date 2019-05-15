import React, { Component, ReactNode } from 'react';
import styled from 'styled-components';
import CommentActions from '../../../GlobalState/ActionAndStates/CommentActions';
import ContentEditorComponent from '../../ContentWrite/ContentEditorComponent';
import { ErrorCode } from '../../../generated/ErrorCode';
import LoginActions from '../../../GlobalState/ActionAndStates/LoginActions';
import PostActions from '../../../GlobalState/ActionAndStates/PostActions';
import startUploadMediaInContentDataToS3 from '../../../utils/uploadMediaInContentDataToS3';
import { convertContentData } from '../../../contentConverter/convertContent';
import { uploadContentToS3 } from '../../../GlobalState/ActionAndStates/ContentActions';

type CommentWriteComponentProps = {
  parentCommentId?: number;
  postId: number;
  cancelWriting: () => void;
}

const Container = styled.div`
  margin: 0px 0px;
`;

export default class CommentWriteComponent extends Component<CommentWriteComponentProps, {}> {
  private static handleWriteCommentError(errorCode?: string): void {
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

  private contentEditorComponent: React.RefObject<ContentEditorComponent>
  = React.createRef<ContentEditorComponent>();

  private getContent(): ReturnType<typeof ContentEditorComponent.prototype.getContent> {
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
      cancelWriting,
    } = this.props;

    const content = this.getContent();

    const mediaUploadResponse = await startUploadMediaInContentDataToS3(content);
    const isMediaUploadSuccessful = mediaUploadResponse.responses.every((response) => {
      if (!response.isSuccessful) {
        CommentWriteComponent.handleWriteCommentError(response.errorCode);
      }
      return response.isSuccessful;
    });
    if (!isMediaUploadSuccessful) {
      return;
    }

    const contentInString = convertContentData(mediaUploadResponse.mediaUploadedContentData);
    const contentUploadResponse = await uploadContentToS3(contentInString);
    if (!contentUploadResponse.isSuccessful) {
      CommentWriteComponent.handleWriteCommentError(contentUploadResponse.errorCode);
      return;
    }

    const contentS3Key = contentUploadResponse.data.key;
    const response = parentCommentId
      ? await CommentActions.writeSubComment(contentS3Key, postId, parentCommentId)
      : await CommentActions.writeComment(contentS3Key, postId);

    if (response.isSuccessful) {
      PostActions.reloadPost(postId);
      cancelWriting();
      return;
    }

    CommentWriteComponent.handleWriteCommentError(response.errorCode);
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
