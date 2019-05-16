import Parchment from 'parchment';
import { Quill } from 'react-quill';

const QuillEmbed = Quill.import('blots/embed') as typeof Parchment.Embed;

export default class EmbedBlot extends QuillEmbed {}
