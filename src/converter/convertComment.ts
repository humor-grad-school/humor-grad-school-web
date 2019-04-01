import yaml from 'js-yaml';
import { ContentData, CommentData, CommentInfo } from '../types/CommentData';

// ---
// content:
//   -
//     type: block
//   -
//     type: inline
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

// TODO: Check error, If needed
function convertCommentContentData(dataInYml: string): ContentData {
  const { content } = yaml.load(dataInYml);
  return content || [];
}

export default function convertComment(commentInfo: CommentInfo, dataInYml: string): CommentData {
  const commentData: CommentData = {
    ...commentInfo,
    content: convertCommentContentData(dataInYml),
  };
  return commentData;
}
