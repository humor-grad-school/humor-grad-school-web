import { CommentData, CommentInfo } from '../types/CommentData';
import convertContent from './convertContent';

export default function convertComment(commentInfo: CommentInfo, dataInYml: string): CommentData {
  const commentData: CommentData = {
    ...commentInfo,
    content: convertContent(dataInYml),
  };
  return commentData;
}
