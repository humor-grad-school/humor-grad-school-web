import yaml from 'js-yaml';
import { PostData } from '../types/PostData';

// ---
// content:
//   -
//     type: text
//     content: you can put text content here.
//   -
//     type: image
//     source: https://image.com/image

export default function convertPost(dataInYml: string): PostData {
  return yaml.load(dataInYml);
}
