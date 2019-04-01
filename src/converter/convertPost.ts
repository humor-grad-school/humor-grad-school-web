import yaml from 'js-yaml';
import {
  PostInfo,
  PostData,
  ContentData,
  ContentElementData,
} from '../types/PostData';
import convertBlotToContent from './convertBlotToContent';
import { PuffBlot } from '../types/PuffBlots';
import {
  CommentTreeElement,
  CommentTreeRoot,
  CommentInfoes,
  CommentInfo,
  ParentComment,
} from '../types/CommentData';

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

function makeCommentTree(commentInfoes: CommentInfoes): CommentTreeElement[] {
  const commentTreeRoot: CommentTreeRoot = [];

  commentInfoes.forEach((commentInfo) => {
    if (!commentInfo.parentComment) return commentTreeRoot.push(commentInfo as CommentTreeElement);
    const parentCommentIndex = commentTreeRoot.findIndex(
      commentTreeElement => commentTreeElement.id
        === (commentInfo.parentComment as ParentComment).id,
    );
    if (parentCommentIndex === -1) return false;

    if (!commentTreeRoot[parentCommentIndex].children) {
      commentTreeRoot[parentCommentIndex].children = [];
    }

    (commentTreeRoot[parentCommentIndex].children as CommentTreeElement[])
      .push(commentInfo as CommentTreeElement);

    return true;
  });

  return commentTreeRoot;
}

const sortByCreatedAt = (a: CommentTreeElement, b: CommentTreeElement): number => {
  // TODO: Fix bug on observer-proxy
  // a.createdAt.getTime() - b.createdAt.getTime()
  const aDate = new Date(a.createdAt);
  const bDate = new Date(b.createdAt);

  return aDate.getTime() - bDate.getTime();
};

function sortCommentTreeElement(_commentTreeElement: CommentTreeElement): CommentTreeElement {
  const commentTreeElement = _commentTreeElement;
  if (commentTreeElement.children) {
    commentTreeElement.children.forEach((childCommentTreeElement, index) => {
      (commentTreeElement.children as CommentTreeElement[])[index] = (
        sortCommentTreeElement(childCommentTreeElement)
      );
    });

    (commentTreeElement.children as CommentTreeElement[]).sort(sortByCreatedAt);
  }

  return commentTreeElement;
}

function sortCommentTree(_commentTreeRoot: CommentTreeRoot): CommentTreeElement[] {
  const commentTreeRoot = _commentTreeRoot;
  commentTreeRoot.forEach((commentTreeElement, index) => {
    commentTreeRoot[index] = sortCommentTreeElement(commentTreeElement);
  });
  commentTreeRoot.sort(sortByCreatedAt);
  return commentTreeRoot;
}

function serializeCommentElement(commentTreeElement: CommentTreeElement): CommentInfoes {
  const commentInfoes: CommentInfoes = [];
  commentInfoes.push(commentTreeElement as CommentInfo);
  if (commentTreeElement.children) {
    commentTreeElement.children.forEach((childCommentTreeElement) => {
      commentInfoes.push(...serializeCommentElement(childCommentTreeElement));
    });
  }

  return commentInfoes;
}

function serializeCommentTree(commentTreeRoot: CommentTreeRoot): CommentInfoes {
  const commentInfoes: CommentInfoes = [];
  commentTreeRoot.forEach((commentTreeElement) => {
    commentInfoes.push(...serializeCommentElement(commentTreeElement));
  });
  return commentInfoes;
}

function sortComments(commentInfoes: CommentInfoes): CommentInfoes {
  const commentTreeRoot = makeCommentTree(commentInfoes);
  const sortedCommentTreeRoot = sortCommentTree(commentTreeRoot);
  const sortedCommentInfoes = serializeCommentTree(sortedCommentTreeRoot);
  return sortedCommentInfoes;
}

export default function convertPost(postInfo: PostInfo, dataInYml: string): PostData {
  const { comments } = postInfo;
  const postData: PostData = {
    ...postInfo,
    comments: sortComments(comments),
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
