import { CommentData, CommentInfo } from '../types/CommentData';
import convertContent from './convertContent';

export default function convertComment(commentInfo: CommentInfo, dataInYml: string): CommentData {
  const {
    id,
    writer,
    parentComment,
    likes,
    createdAt,
  } = commentInfo;

  const commentData: CommentData = {
    id,
    writer,
    parentComment,
    content: convertContent(dataInYml),
    likes,
    createdAt,
  };
  return commentData;
}
