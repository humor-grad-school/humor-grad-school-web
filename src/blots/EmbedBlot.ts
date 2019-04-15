import Parchment from 'parchment';
import { Quill } from 'react-quill';

const QuillEmbed = Quill.import('blots/embed') as typeof Parchment.Embed;

class EmbedBlot extends QuillEmbed {}

export default EmbedBlot;
