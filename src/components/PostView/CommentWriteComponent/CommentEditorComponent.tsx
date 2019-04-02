import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import { PuffBlot } from '../../../types/PuffBlots';

export default class CommentEditorComponent extends Component<{}, {}> {
  private quill: React.RefObject<ReactQuill> = React.createRef<ReactQuill>();

  private modules = {
    toolbar: [
      ['image'],
    ],
  }

  public getContent(): PuffBlot[] {
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
