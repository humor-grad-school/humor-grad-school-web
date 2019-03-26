import React, { Component, ReactNode } from 'react';
import './PostWritePage.scss';
import { DeltaStatic, Delta } from 'quill';
import PostActions from '../../GlobalState/ActionAndStates/PostActions';
import PostEditorComponent from './PostEditorComponent';

export default class PostWritePage extends Component<{}, {}> {
  private postEditorComponent: React.RefObject<PostEditorComponent>
  = React.createRef<PostEditorComponent>();

  private getContent(): DeltaStatic {
    if (!this.postEditorComponent || !this.postEditorComponent.current) return new Delta();
    const postEditorComponent = this.postEditorComponent.current;
    return postEditorComponent.getContent();
  }

  private postContent(): void {
    const deltaStatic = this.getContent();
    PostActions.writePost(deltaStatic);
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
