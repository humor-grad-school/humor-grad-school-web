import React, { Component, ReactNode } from 'react';
import styled from 'styled-components';
import PostActions from '../../GlobalState/ActionAndStates/PostActions';
import PostEditorComponent from './PostEditorComponent';
import { PuffBlot } from '../../types/PuffBlots';

const Container = styled.div`
  margin: 0 3em;
  max-width: 100%;
  padding: 2em 1em;
  justify-content: center;
  background-color: #EEE;
`;

export default class PostWritePage extends Component<{}, {}> {
  private postEditorComponent: React.RefObject<PostEditorComponent>
  = React.createRef<PostEditorComponent>();

  private getContent(): PuffBlot[] {
    if (!this.postEditorComponent || !this.postEditorComponent.current) return [];
    const postEditorComponent = this.postEditorComponent.current;
    return postEditorComponent.getContent();
  }

  private postContent(): void {
    const content = this.getContent();
    PostActions.writePost(content);
  }

  public render(): ReactNode {
    return (
      <Container>
        <PostEditorComponent ref={this.postEditorComponent} />
        <button
          className="post-button"
          onClick={() => this.postContent()}
          type="button"
        >
          작성완료!
        </button>
      </Container>
    );
  }
}
