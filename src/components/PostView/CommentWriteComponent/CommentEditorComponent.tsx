import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import { unconfirmedBlot } from '../../../types/Blot';

export default class CommentEditorComponent extends Component<{}, {}> {
  private quill: React.RefObject<ReactQuill> = React.createRef<ReactQuill>();

  private modules = {
    toolbar: [
      ['image'],
    ],
  }

  public getContent(): unconfirmedBlot[] {
    if (!this.quill || !this.quill.current) return [];
    const quill = this.quill.current.getEditor();
    return quill.getLines();
  }

  public render(): JSX.Element {
    return (
      <div>
        <ReactQuill
          ref={this.quill}
          modules={this.modules}
          theme="snow"
        />
      </div>
    );
  }
}
