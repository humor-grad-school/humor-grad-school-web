import React, { Component } from 'react';
import '../../../node_modules/react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import PostEditorToolbarComponent from './PostEditorToolbarComponent';
import { unconfirmedBlot } from '../../types/Blot';

export default class PostEditorComponent extends Component<{}, {}> {
  private quill: React.RefObject<ReactQuill> = React.createRef<ReactQuill>();

  private modules = {
    toolbar: {
      container: '#ql-custom-toolbar',
    },
  }

  public getContent(): unconfirmedBlot[] {
    if (!this.quill || !this.quill.current) return [];
    const quill = this.quill.current.getEditor();
    return quill.getLines();
  }

  public render(): JSX.Element {
    return (
      <div>
        <PostEditorToolbarComponent />
        <ReactQuill
          ref={this.quill}
          modules={this.modules}
          theme="snow"
        />
      </div>
    );
  }
}
