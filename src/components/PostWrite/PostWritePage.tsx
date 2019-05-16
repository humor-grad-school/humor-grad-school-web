import React, { Component, ReactNode } from 'react';
import styled from 'styled-components';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import PostActions from '../../GlobalState/ActionAndStates/PostActions';
import PostTitleInputComponent from './PostTitleInputComponent';
import ContentEditorComponent from '../ContentWrite/ContentEditorComponent';
import LoginActions from '../../GlobalState/ActionAndStates/LoginActions';
import { ErrorCode } from '../../generated/ErrorCode';
import { uploadContentToS3 } from '../../GlobalState/ActionAndStates/ContentActions';
import { convertContentData } from '../../contentConverter/convertContent';
import startUploadMediaInContentDataToS3 from '../../utils/uploadMediaInContentDataToS3';
import EmbedBlot from '../../blots/EmbedBlot';
import { MediaBlot } from '../../blots/ImageBlot';
import convertBlotsToContentData from '../../contentConverter/convertBlotsToContentData';

type PostWritePageProps = RouteComponentProps<PostViewPageParams>

interface PostViewPageParams {
  boardName: string;
}

type PostWritePageStates = {
  redirectTo: string;
}

const Container = styled.div`
  margin: 0 3em;
  max-width: 100%;
  padding: 2em 1em;
  justify-content: center;
  background-color: #EEE;
  text-align: center;
`;

const DoneButton = styled.button`
  color: #FFF;
  border: 0px;
  border-radius: 1.5em;
  padding: 0.75em 1.5em;
  background-color: #777;
  transition: background-color 0.25s;
  cursor: pointer;
  margin-top: 1em;

  &:hover {
    background-color: #888;
  }
`;

export default class PostWritePage extends Component<PostWritePageProps, PostWritePageStates> {
  private static handleWritePostError(errorCode?: string): void {
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

  private postTitleInputComponent: React.RefObject<PostTitleInputComponent>
  = React.createRef<PostTitleInputComponent>();

  public constructor(props: PostWritePageProps) {
    super(props);

    this.state = {
      redirectTo: '',
    };
  }

  private getTitle(): string {
    if (!this.postTitleInputComponent || !this.postTitleInputComponent.current) {
      return '';
    }
    const postTitleInputComponent = this.postTitleInputComponent.current;
    return postTitleInputComponent.getTitle();
  }

  private getContent(): ReturnType<typeof ContentEditorComponent.prototype.getContent> {
    if (!this.contentEditorComponent || !this.contentEditorComponent.current) {
      return [];
    }
    const contentEditorComponent = this.contentEditorComponent.current;
    return contentEditorComponent.getContent();
  }

  private getBlots(): EmbedBlot[] {
    if (!this.contentEditorComponent || !this.contentEditorComponent.current) {
      return [];
    }
    const contentEditorComponent = this.contentEditorComponent.current;
    return contentEditorComponent.getBlots();
  }

  private redirect(redirectTo: string): void {
    this.setState({
      redirectTo,
    });
  }

  private async writePost(): Promise<void> {
    const { match } = this.props;
    const { boardName } = match.params;

    const blots = this.getBlots();

    const mediaBlots = blots.filter(blot => blot instanceof MediaBlot);

    const encodingFailedMediaBlotsOnPreviousTime = mediaBlots.filter();

    retryEncoding(encodingFailedMediaBlotsOnPreviousTime);

    const firstEncodingFailedMediaBlot = Promise.race(); // if mediaBlot's encoding  promise is pending, run await that.

    if (firstEncodingFailedMediaBlot) {
      // Alert, let user try again
    }

    const contentData = convertBlotsToContentData(blots);
    // ...On Editing...
    // - Encode Media in background

    // Function writePost(Blots): Promise<void>
    // - Check background encoding is successful or retry failed encoding request on previous time.
    // --> What if we fail to encode?
    // ----> warn to user and let them try again.
    // - Convert Blot to ElementData
    // DONE

    const contentInYml = convertContentData(contentData);
    const contentUploadResponse = await uploadContentToS3(contentInYml);
    if (!contentUploadResponse.isSuccessful) {
      PostWritePage.handleWritePostError(contentUploadResponse.errorCode);
      return;
    }

    const title = this.getTitle();
    const writePostResponse = await PostActions.writePost(
      title,
      contentUploadResponse.data.key,
      boardName,
    );

    if (!writePostResponse.isSuccessful) {
      PostWritePage.handleWritePostError(writePostResponse.errorCode);
      return;
    }

    this.redirect(`/post/${writePostResponse.data.postId}`);
  }

  public render(): ReactNode {
    const {
      redirectTo,
    } = this.state;

    if (redirectTo) {
      return <Redirect to={redirectTo} />;
    }

    return (
      <Container>
        <PostTitleInputComponent ref={this.postTitleInputComponent} />
        <ContentEditorComponent ref={this.contentEditorComponent} />
        <DoneButton
          className="post-button"
          onClick={() => this.writePost()}
          type="button"
        >
          작성완료!
        </DoneButton>
      </Container>
    );
  }
}
