import Parchment from 'parchment';
import { Quill } from 'react-quill';

const QuillText = Quill.import('blots/text') as typeof Parchment.Text;

class TextBlot extends QuillText {}

export default TextBlot;
