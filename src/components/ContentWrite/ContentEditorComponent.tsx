import React, { Component } from 'react';
import '../../../node_modules/react-quill/dist/quill.snow.css';
import ReactQuill, { Quill } from 'react-quill';
import { unconfirmedBlot, formatString } from '../../types/Blot';
import ImageBlot from '../../blots/ImageBlot';
import ContentEditorToolbarComponent from './ContentEditorToolbarComponent';

type ContentEditorComponentProps = {
  allowedFormats?: formatString[];
}

[
  ImageBlot,
].forEach(blot => Quill.register(blot));

export default class ContentEditorComponent extends Component<ContentEditorComponentProps, {}> {
  private quill: React.RefObject<ReactQuill> = React.createRef<ReactQuill>();

  private modules = {
    toolbar: {
      container: '#ql-custom-toolbar',
      handlers: {
        image: () => { this.handleImage(); },
      },
    },
  }

  public constructor(props: ContentEditorComponentProps) {
    super(props);

    const {
      allowedFormats,
    } = props;

    this.allowedFormats = allowedFormats
      || [
        'bold',
        'italic',
        'underline',
        'image',
      ];
  }

  public getContent(): unconfirmedBlot[] {
    if (!this.quill || !this.quill.current) return [];
    const quill = this.quill.current.getEditor();
    return quill.getLines();
  }

  private allowedFormats: formatString[]

  private handleImage(): Promise<void> {
    return new Promise((resolve, reject) => {
      const quillComponent = this.quill.current;
      if (!quillComponent) return;
      const quill = quillComponent.getEditor();

      const inputElement = document.createElement('input');
      inputElement.type = 'file';
      inputElement.accept = 'image/*';
      inputElement.oninput = () => {
        const { files } = inputElement;
        if (!files) return reject();
        const file = files[0];
        const url = URL.createObjectURL(file);

        const selection = quill.getSelection();
        const index = selection
          ? selection.index
          : quill.getLength();

        quill.insertEmbed(index, 'image', {
          alt: file.name,
          url,
        }, 'user');

        quill.setSelection(index + 1, 0);
        return resolve();
      };

      inputElement.click();
    });
  }

  public render(): JSX.Element {
    return (
      <div>
        <ContentEditorToolbarComponent allowedFormats={this.allowedFormats} />
        <ReactQuill
          ref={this.quill}
          modules={this.modules}
          formats={this.allowedFormats}
          theme="snow"
        />
      </div>
    );
  }
}
