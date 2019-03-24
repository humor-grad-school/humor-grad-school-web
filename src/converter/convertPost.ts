import yaml from 'js-yaml';
import { ContentData, PostData, PostInfo } from '../types/PostData';

// ---
// content:
//   -
//     type: text
//     content: you can put text content here.
//   -
//     type: image
//     source: https://image.com/image

// TODO: Check error, If needed
function convertPostContentData(dataInYml: string): ContentData {
  const { content } = yaml.load(dataInYml);
  return content || [];
}

export default function convertPost(post: PostInfo, dataInYml: string): PostData {
  const postData: PostData = {
    ...post,
    content: convertPostContentData(dataInYml),
  };
  return postData;
}
