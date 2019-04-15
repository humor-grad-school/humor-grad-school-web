import Parchment from 'parchment';
import { Quill } from 'react-quill';

const QuillContainer = Quill.import('blots/container') as typeof Parchment.Container;

class ContainerBlot extends QuillContainer {}

export default ContainerBlot;
