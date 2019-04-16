import EmbedBlot from './EmbedBlot';

export type ImageBlotValue = {
  alt: string;
  url: string;
}

class ImageBlot extends EmbedBlot {
  public static create(value: ImageBlotValue): Node {
    const node = (super.create(value) as HTMLElement);
    node.setAttribute('alt', value.alt || '');
    node.setAttribute('src', value.url || '');
    node.setAttribute('title', value.alt || '');
    return node;
  }

  public static value(node: HTMLElement): ImageBlotValue {
    return {
      alt: node.getAttribute('alt') || '',
      url: node.getAttribute('src') || '',
    };
  }
}
ImageBlot.blotName = 'image';
ImageBlot.tagName = 'img';

export default ImageBlot;
