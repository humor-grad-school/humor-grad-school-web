import yaml from 'js-yaml';
import { ContentData, PostData, PostInfo } from '../types/PostData';

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
