import React, { Component } from 'react';
import '../../../node_modules/react-quill/dist/quill.snow.css';
import ReactQuill, { Quill } from 'react-quill';
import styled from 'styled-components';
import { unconfirmedBlot, formatString } from '../../types/Blot';
import ImageBlot from '../../blots/ImageBlot';
import ContentEditorToolbarComponent from './ContentEditorToolbarComponent';
import limitEmbed from '../../utils/limitEmbed';

const Delta = Quill.import('delta');

type ContentLimit = {
  image: number;
  length: number;
}

type ContentEditorComponentProps = {
  allowedFormats?: formatString[];
  contentLimit?: Partial<ContentLimit>;
}

[
  ImageBlot,
].forEach(blot => Quill.register(blot));

const Container = styled.div`
  .ql-toolbar.ql-snow {
    border-bottom: 0px;
    background-color: #CCC;
  }
`;

const StyledReactQuill = styled(ReactQuill)`
  border: 4px solid #CCC;

  .ql-editor {
    min-height: 25vh;
  }
`;

function generateContentLimit(contentLimit?: Partial<ContentLimit>): ContentLimit {
  const resultContentLimit = contentLimit || {};
  resultContentLimit.image = resultContentLimit.image || -1;
  resultContentLimit.length = resultContentLimit.length || -1;
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
    if (!this.quill || !this.quill.current) {
      return;
    }
    const quill = this.quill.current.getEditor();
    quill.on('text-change', this.handleTextChange);
  }

  public componentWillUnmount(): void {
    if (!this.quill || !this.quill.current) {
      return;
    }
    const quill = this.quill.current.getEditor();
    quill.off('text-change', this.handleTextChange);
  }

  public getContent(): unconfirmedBlot[] {
    if (!this.quill || !this.quill.current) {
      return [];
    }
    const quill = this.quill.current.getEditor();
    return quill.getLines();
  }

  private allowedFormats: formatString[]

  private contentLimit: ContentLimit

  private handleTextChange(): void {
    if (!this.quill || !this.quill.current) {
      return;
    }
    const quill = this.quill.current.getEditor();
    const delta = quill.getContents();
    const embedLimitedOps = limitEmbed(delta.ops, this.contentLimit);
    const embedLimitedDelta = embedLimitedOps
      ? new Delta(embedLimitedOps)
      : delta;

    const hasLengthLimit = this.contentLimit.length >= 0;
    const isExceedLengthLimit = embedLimitedDelta.length() > this.contentLimit.length;
    const lengthLimitedDelta = (hasLengthLimit && isExceedLengthLimit)
      ? embedLimitedDelta.slice(0, this.contentLimit.length)
      : null;

    const shouldLimit = embedLimitedOps || lengthLimitedDelta;
    if (shouldLimit) {
      const limitedDelta = lengthLimitedDelta || embedLimitedDelta;
      quill.setContents(limitedDelta, 'silent');
    }
  }

  private handleImage(): Promise<void> {
    return new Promise((resolve, reject) => {
      const quillComponent = this.quill.current;
      if (!quillComponent) {
        return;
      }
      const quill = quillComponent.getEditor();

      const inputElement = document.createElement('input');
      inputElement.type = 'file';
      inputElement.accept = 'image/*';
      inputElement.oninput = () => {
        const { files } = inputElement;
        if (!files) {
          return reject();
        }
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
      <Container>
        <ContentEditorToolbarComponent allowedFormats={this.allowedFormats} />
        <StyledReactQuill
          ref={this.quill}
          modules={this.modules}
          formats={this.allowedFormats}
          theme="snow"
        />
      </Container>
    );
  }
}
