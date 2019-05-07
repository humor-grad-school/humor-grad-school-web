import React, { Component, ReactNode } from 'react';
import styled from 'styled-components';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import PostActions from '../../GlobalState/ActionAndStates/PostActions';
import { unconfirmedBlot } from '../../types/Blot';
import PostTitleInputComponent from './PostTitleInputComponent';
import ContentEditorComponent from '../ContentWrite/ContentEditorComponent';
import LoginActions from '../../GlobalState/ActionAndStates/LoginActions';
import { ErrorCode } from '../../generated/ErrorCode';

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
    if (!this.postTitleInputComponent || !this.postTitleInputComponent.current) return '';
    const postTitleInputComponent = this.postTitleInputComponent.current;
    return postTitleInputComponent.getTitle();
  }

  private getContent(): unconfirmedBlot[] {
    if (!this.contentEditorComponent || !this.contentEditorComponent.current) return [];
    const contentEditorComponent = this.contentEditorComponent.current;
    return contentEditorComponent.getContent();
  }

  private redirect(redirectTo: string): void {
    this.setState({
      redirectTo,
    });
  }

  private async writePost(): Promise<void> {
    const { match } = this.props;
    const { params } = match;

    const title = this.getTitle();
    const content = this.getContent();
    const { boardName } = params;

    // TODO: Rework it not to use try catch
    let errorCode = '';

    try {
      const response = await PostActions.writePost(title, content, boardName);

      if (response.isSuccessful) {
        this.redirect(`/post/${response.data.postId}`);
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
      redirectTo,
    } = this.state;

    if (redirectTo) return <Redirect to={redirectTo} />;

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
