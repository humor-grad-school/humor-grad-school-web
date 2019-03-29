export enum PuffBlotType {
  Block = 'block',
  Inline = 'inline',
  Bold = 'bold',
  Italic = 'italic',
  Underline = 'underline',
  Break = 'break',
  Text = 'text',
  Image = 'image',
}

export interface PuffBlot {
  statics: {
    blotName: PuffBlotType;
  };
  prev: PuffBlot | null;
  next: PuffBlot | null;
  length: () => number;
  children?: PuffBlot[];
}

export interface PuffBlockBlot extends PuffBlot {
  statics: {
    blotName: PuffBlotType.Block;
  };
}

export interface PuffInlineBlot extends PuffBlot {
  statics: {
    blotName: PuffBlotType.Inline;
  };
}

export interface PuffBoldBlot extends PuffBlot {
  statics: {
    blotName: PuffBlotType.Bold;
  };
}

export interface PuffItalicBlot extends PuffBlot {
  statics: {
    blotName: PuffBlotType.Italic;
  };
}

export interface PuffUnderlineBlot extends PuffBlot {
  statics: {
    blotName: PuffBlotType.Underline;
  };
}

export interface PuffBreakBlot extends PuffBlot {
  statics: {
    blotName: PuffBlotType.Break;
  };
}

export interface PuffTextBlot extends PuffBlot {
  statics: {
    blotName: PuffBlotType.Text;
  };
  text: string;
}

export interface PuffImageBlot extends PuffBlot {
  statics: {
    blotName: PuffBlotType.Image;
  };
  domNode: {
    currentSrc: string;
  };
}
