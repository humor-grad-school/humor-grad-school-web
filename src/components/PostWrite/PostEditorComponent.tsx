import React, { Component } from 'react';
import '../../../node_modules/react-quill/dist/quill.snow.css';
import './PostEditorComponent.scss';
import ReactQuill from 'react-quill';
import { Delta, DeltaStatic } from 'quill';

export default class PostEditorComponent extends Component<{}, {}> {
  private quill: React.RefObject<ReactQuill> = React.createRef<ReactQuill>();

  public getContent(): DeltaStatic {
    if (!this.quill || !this.quill.current) return new Delta();
    const quill = this.quill.current.getEditor();
    return quill.getContents();
  }

  public render(): JSX.Element {
    return (
      <div id="post-editor container">
        <ReactQuill
          className="editor"
          ref={this.quill}
          theme="snow"
        />
      </div>
    );
  }
}
