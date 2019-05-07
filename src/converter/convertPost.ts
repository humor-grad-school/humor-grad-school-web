import {
  PostInfo,
  PostData,
} from '../types/PostData';
import {
  CommentTreeElement,
  CommentTreeRoot,
  CommentInfoes,
  CommentInfo,
} from '../types/CommentData';
import convertContent from './convertContent';

function findParentComment(
  commentTreeElement: CommentTreeElement,
  parentCommentId: number,
): CommentTreeElement | undefined {
  if (commentTreeElement.id === parentCommentId) {
    return commentTreeElement;
  }

  const { children } = commentTreeElement;
  if (!children) {
    return undefined;
  }

  const parentComment = children.reduce((
    accumulator: CommentTreeElement | undefined,
    currentElement,
  ) => {
    if (accumulator) {
      return accumulator;
    }
    return findParentComment(currentElement, parentCommentId);
  }, undefined);

  return parentComment;
}

function startFindParentComment(
  commentTreeRoot: CommentTreeRoot,
  parentCommentId: number,
): CommentTreeElement | undefined {
  const parentCommentOnTop = commentTreeRoot.find(
    commentTreeElement => commentTreeElement.id === parentCommentId,
  );

  if (parentCommentOnTop) {
    return parentCommentOnTop;
  }

  const parentComment = commentTreeRoot.reduce((
    accumulator: CommentTreeElement | undefined,
    currentElement,
  ) => {
    if (accumulator) {
      return accumulator;
    }
    return findParentComment(currentElement, parentCommentId);
  }, undefined);

  return parentComment;
}

function makeCommentTree(commentInfoes: CommentInfoes): CommentTreeElement[] {
  const commentTreeRoot: CommentTreeRoot = [];

  commentInfoes.forEach((commentInfo) => {
    if (!commentInfo.parentComment) {
      commentTreeRoot.push(commentInfo);
      return;
    }

    const parentComment = startFindParentComment(commentTreeRoot, commentInfo.parentComment.id);

    if (!parentComment) {
      return;
    }

    if (!parentComment.children) {
      parentComment.children = [];
    }

    parentComment.children.push(commentInfo);
  });

  return commentTreeRoot;
}

const sortByCreatedAt = (a: CommentTreeElement, b: CommentTreeElement): number => {
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
    content: convertContent(dataInYml),
  };
  return postData;
}
