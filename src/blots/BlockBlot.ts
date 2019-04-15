import Parchment from 'parchment';
import { Quill } from 'react-quill';

const QuillBlock = Quill.import('blots/block') as typeof Parchment.Block;

class BlockBlot extends QuillBlock {}

export default BlockBlot;
