import uuid from 'uuid/v4';
import EmbedBlot from './EmbedBlot';
import { uploadMediaToS3 } from '../GlobalState/ActionAndStates/ContentActions';

const encodingPod: {[encodingId: string]: Promise<string>} = {};

export interface MediaBlotValue {
  url: string;
  encodingUrlPromise: Promise<string>;
}

export interface ImageBlotValue extends MediaBlotValue {
  alt: string;
  url: string;
}

async function EncodeObjectUrl(objectUrl: string): Promise<string> {
  const response = await fetch(objectUrl);
  const blob = await response.blob();
  const uploadMediaResponse = await uploadMediaToS3(blob);

  if (!uploadMediaResponse.isSuccessful) {
    throw new Error(uploadMediaResponse.errorCode);
  }

  return uploadMediaResponse.data.key;
}

export class MediaBlot extends EmbedBlot {
  public static create(value: MediaBlotValue): Node {
    const node = super.create(value) as HTMLElement;

    const encodingId = uuid();
    const encodingUrlPromise = EncodeObjectUrl(value.url);
    encodingPod[encodingId] = encodingUrlPromise;
    node.setAttribute('encodingId', encodingId);

    return node;
  }

  public static value(node: HTMLElement): MediaBlotValue {
    return {
      url: node.getAttribute('src') || '',
      encodingUrlPromise: encodingPod[node.getAttribute('encodingId') || ''],
    };
  }
}

export default class ImageBlot extends MediaBlot {
  public static blotName: string = 'image';

  public static tagName: string = 'img';

  public static create(value: ImageBlotValue): Node {
    const node = super.create(value) as HTMLElement;
    node.setAttribute('alt', value.alt);
    node.setAttribute('src', value.url);
    node.setAttribute('title', value.alt);

    return node;
  }

  public static value(node: HTMLElement): ImageBlotValue {
    return {
      ...super.value(node),
      alt: node.getAttribute('alt') || '',
    };
  }
}
