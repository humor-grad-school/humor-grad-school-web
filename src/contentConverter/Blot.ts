import ContainerBlot from '../blots/ContainerBlot';
import BlockBlot from '../blots/BlockBlot';
import TextBlot from '../blots/TextBlot';
import ImageBlot from '../blots/ImageBlot';

export enum BlotType {
  Block = 'block',
  Inline = 'inline',
  Bold = 'bold',
  Italic = 'italic',
  Underline = 'underline',
  Break = 'break',
  Text = 'text',
  Image = 'image',
}

export type unconfirmedBlot =(
  | ContainerBlot
  | BlockBlot
  | TextBlot
  | ImageBlot
);

export type formatString = (
  | 'block'
  | 'inline'
  | 'bold'
  | 'italic'
  | 'underline'
  | 'break'
  | 'text'
  | 'image'
);
