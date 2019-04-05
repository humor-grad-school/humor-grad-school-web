import React, { Component, ReactNode } from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';
import PostActions from '../../GlobalState/ActionAndStates/PostActions';
import PostEditorComponent from './PostEditorComponent';
import { PuffBlot } from '../../types/PuffBlots';

type PostWritePageProps = RouteComponentProps<PostViewPageParams>

interface PostViewPageParams {
  boardName: string;
}

type PostWritePageStates = {
  title: string;
}

const Container = styled.div`
  margin: 0 3em;
  max-width: 100%;
  padding: 2em 1em;
  justify-content: center;
  background-color: #EEE;
`;

const TitleInput = styled.input`

`;

export default class PostWritePage extends Component<PostWritePageProps, PostWritePageStates> {
  private postEditorComponent: React.RefObject<PostEditorComponent>
  = React.createRef<PostEditorComponent>();

  public constructor(props: PostWritePageProps) {
    super(props);

    this.state = {
      title: '',
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
  }

  private getContent(): PuffBlot[] {
    if (!this.postEditorComponent || !this.postEditorComponent.current) return [];
    const postEditorComponent = this.postEditorComponent.current;
    return postEditorComponent.getContent();
  }

  private async writePost(): Promise<void> {
    const { match } = this.props;
    const { params } = match;

    const { title } = this.state;
    const content = this.getContent();
    const { boardName } = params;

    try {
      await PostActions.writePost(title, content, boardName);
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
    const { title } = this.state;

    return (
      <Container>
        <TitleInput
          type="text"
          value={title}
          onChange={this.handleTitleChange}
          placeholder="[여기에 제목 입력]"
        />
        <PostEditorComponent ref={this.postEditorComponent} />
        <button
          className="post-button"
          onClick={() => this.writePost()}
          type="button"
        >
          작성완료!
        </button>
      </Container>
    );
  }
}
