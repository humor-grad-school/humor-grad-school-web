import React, { Component, ReactNode } from 'react';
import styled from 'styled-components';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import './PostWritePage.scss';
import PostActions from '../../GlobalState/ActionAndStates/PostActions';
import PostEditorComponent from './PostEditorComponent';
import { PuffBlot } from '../../types/PuffBlots';

type PostWritePageProps = RouteComponentProps<PostViewPageParams>

interface PostViewPageParams {
  boardName: string;
}

type PostWritePageStates = {
  title: string;
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

const TitleInput = styled.input`
  margin-bottom: 1em;
  padding: 0.5em;
  border: 4px solid #999;
  width: calc(100% - 1em - 8px);
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
  private postEditorComponent: React.RefObject<PostEditorComponent>
  = React.createRef<PostEditorComponent>();

  public constructor(props: PostWritePageProps) {
    super(props);

    this.state = {
      title: '',
      redirectTo: '',
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
  }

  private getContent(): PuffBlot[] {
    if (!this.postEditorComponent || !this.postEditorComponent.current) return [];
    const postEditorComponent = this.postEditorComponent.current;
    return postEditorComponent.getContent();
  }

  private redirect(redirectTo: string): void {
    this.setState({
      redirectTo,
    });
  }

  private async writePost(): Promise<void> {
    const { match } = this.props;
    const { params } = match;

    const { title } = this.state;
    const content = this.getContent();
    const { boardName } = params;

    try {
      const postId = await PostActions.writePost(title, content, boardName);
      if (postId === -1) return;
      this.redirect(`/post/${postId}`);
    } catch (error) {
      if (error.message === '401') {
        alert('로그인이 필요합니다.');
        return;
      }
      alert('알 수 없는 에러로 실패했습니다.');
    }
  }

  private handleTitleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({
      title: event.target.value,
    });
  }

  public render(): ReactNode {
    const {
      title,
      redirectTo,
    } = this.state;

    if (redirectTo) return <Redirect to={redirectTo} />;

    return (
      <Container>
        <TitleInput
          type="text"
          value={title}
          onChange={this.handleTitleChange}
          placeholder="[여기에 제목 입력]"
        />
        <PostEditorComponent ref={this.postEditorComponent} />
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
