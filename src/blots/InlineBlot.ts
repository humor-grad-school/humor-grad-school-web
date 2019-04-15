import Parchment from 'parchment';
import { Quill } from 'react-quill';

const QuillInline = Quill.import('blots/inline') as typeof Parchment.Inline;

class InlineBlot extends QuillInline {}

export default InlineBlot;
