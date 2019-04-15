import Parchment from 'parchment';
import { Quill } from 'react-quill';

const QuillScroll = Quill.import('blots/scroll') as typeof Parchment.Scroll;

class ScrollBlot extends QuillScroll {}

export default ScrollBlot;
