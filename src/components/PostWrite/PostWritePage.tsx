import React, { Component, ReactNode } from 'react';
import './PostWritePage.scss';
import PostActions from '../../GlobalState/ActionAndStates/PostActions';
import PostEditorComponent from './PostEditorComponent';
import { PuffBlot } from '../../types/PuffBlots';

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
      <div className="post-write-page container">
        <PostEditorComponent ref={this.postEditorComponent} />
        <button
          className="post-button"
          onClick={() => this.postContent()}
          type="button"
        >
          작성완료!
        </button>
      </div>
    );
  }
}
