import yaml from 'js-yaml';
import { ContentData } from '../types/ContentData';

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
export default function convertContent(dataInYml: string): ContentData {
  const { content } = yaml.load(dataInYml);
  return content || [];
}

export function convertContentData(dataInObject: ContentData): string {
  return yaml.dump({ content: dataInObject });
}
