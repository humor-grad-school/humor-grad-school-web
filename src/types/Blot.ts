import ContainerBlot from '../blots/ContainerBlot';
import BlockBlot from '../blots/BlockBlot';
import TextBlot from '../blots/TextBlot';

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
);
