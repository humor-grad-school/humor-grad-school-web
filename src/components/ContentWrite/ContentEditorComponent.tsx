import React, { Component } from 'react';
import '../../../node_modules/react-quill/dist/quill.snow.css';
import ReactQuill, { Quill } from 'react-quill';
import { unconfirmedBlot, formatString } from '../../types/Blot';
import ImageBlot from '../../blots/ImageBlot';
import ContentEditorToolbarComponent from './ContentEditorToolbarComponent';
import limitEmbed from '../../utils/limitEmbed';

const Delta = Quill.import('delta');

type ContentLimit = {
  image: number;
}

type ContentEditorComponentProps = {
  allowedFormats?: formatString[];
  contentLimit?: Partial<ContentLimit>;
}

[
  ImageBlot,
].forEach(blot => Quill.register(blot));

function generateContentLimit(contentLimit?: Partial<ContentLimit>): ContentLimit {
  const resultContentLimit = contentLimit || {};
  resultContentLimit.image = resultContentLimit.image || -1;
  return (resultContentLimit as ContentLimit);
}

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
      contentLimit,
    } = props;

    this.allowedFormats = allowedFormats
      || [
        'bold',
        'italic',
        'underline',
        'image',
      ];

    this.contentLimit = generateContentLimit(contentLimit);

    this.handleTextChange = this.handleTextChange.bind(this);
  }

  public componentDidMount(): void {
    if (!this.quill || !this.quill.current) return;
    const quill = this.quill.current.getEditor();
    quill.on('text-change', this.handleTextChange);
  }

  public componentWillUnmount(): void {
    if (!this.quill || !this.quill.current) return;
    const quill = this.quill.current.getEditor();
    quill.off('text-change', this.handleTextChange);
  }

  public getContent(): unconfirmedBlot[] {
    if (!this.quill || !this.quill.current) return [];
    const quill = this.quill.current.getEditor();
    return quill.getLines();
  }

  private allowedFormats: formatString[]

  private contentLimit: ContentLimit

  private handleTextChange(): void {
    if (!this.quill || !this.quill.current) return;
    const quill = this.quill.current.getEditor();
    const delta = quill.getContents();
    const embedLimitedOps = limitEmbed(delta.ops, this.contentLimit);
    if (embedLimitedOps) quill.setContents(new Delta(embedLimitedOps), 'silent');
  }

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
