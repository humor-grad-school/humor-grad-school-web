import yaml from 'js-yaml';
import {
  PostInfo,
  PostData,
  ContentData,
  ContentElementData,
} from '../types/PostData';
import convertBlotToContent from './convertBlotToContent';
import { PuffBlot } from '../types/PuffBlots';

// ---
// content:
//   -
//     type: block
//   -
//     type: inline
//   -
//     type: bold
//   -
//     type: italic
//   -
//     type: underline
//   -
//     type: break
//   -
//     type: text
//     content: you can put text content here.
//   -
//     type: image
//     source: https://image.com/image
//   -
//     type: block
//     children:
//       -
//         type: text
//         content: you can put text content here.
//   -
//     type: inline
//     children:
//       -
//         type: text
//         content: you can put text content here.
//   -
//     type: bold
//     children:
//       -
//         type: text
//         content: you can put text content here.
//   -
//     type: italic
//     children:
//       -
//         type: text
//         content: you can put text content here.
//   -
//     type: underline
//     children:
//       -
//         type: text
//         content: you can put text content here.

// TODO: Check error, If needed
function convertPostContentData(dataInYml: string): ContentData {
  const { content } = yaml.load(dataInYml);
  return content || [];
}

export default function convertPost(postInfo: PostInfo, dataInYml: string): PostData {
  const postData: PostData = {
    ...postInfo,
    content: convertPostContentData(dataInYml),
  };
  return postData;
}

export function convertContentData(dataInObject: ContentData): string {
  return yaml.dump({ content: dataInObject });
}

export async function convertBlotsToContentData(blots: PuffBlot[]): Promise<ContentData> {
  const blotConvertingPromises: Promise<ContentElementData>[] = [];

  blots.forEach(async (blot) => {
    blotConvertingPromises.push(convertBlotToContent(blot));
  });

  const contentData: ContentData = await Promise.all(blotConvertingPromises);
  return contentData;
}
