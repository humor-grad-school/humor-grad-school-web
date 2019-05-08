import {
  PostInfo,
  PostData,
} from '../types/PostData';
import convertContent from './convertContent';
import sortComments from '../utils/sortComments';

export default function convertPost(postInfo: PostInfo, dataInYml: string): PostData {
  const { comments } = postInfo;
  const postData: PostData = {
    ...postInfo,
    comments: sortComments(comments),
    content: convertContent(dataInYml),
  };
  return postData;
}
