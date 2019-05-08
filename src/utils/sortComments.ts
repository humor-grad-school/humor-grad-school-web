import {
  CommentTreeElement,
  CommentTreeRoot,
  CommentInfoes,
} from '../types/CommentData';

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

function sortCommentTreeElement(commentTreeElement: CommentTreeElement): CommentTreeElement {
  if (commentTreeElement.children) {
    commentTreeElement.children.forEach((childCommentTreeElement) => {
      // eslint-disable-next-line no-param-reassign
      childCommentTreeElement = sortCommentTreeElement(childCommentTreeElement);
    });

    commentTreeElement.children.sort(sortByCreatedAt);
  }

  return commentTreeElement;
}

function sortCommentTree(commentTreeRoot: CommentTreeRoot): CommentTreeElement[] {
  commentTreeRoot.forEach((commentTreeElement) => {
    // eslint-disable-next-line no-param-reassign
    commentTreeElement = sortCommentTreeElement(commentTreeElement);
  });

  commentTreeRoot.sort(sortByCreatedAt);

  return commentTreeRoot;
}

function serializeCommentElement(commentTreeElement: CommentTreeElement): CommentInfoes {
  const commentInfoes: CommentInfoes = [];
  commentInfoes.push(commentTreeElement);

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

export default function sortComments(commentInfoes: CommentInfoes): CommentInfoes {
  const commentTreeRoot = makeCommentTree(commentInfoes);
  const sortedCommentTreeRoot = sortCommentTree(commentTreeRoot);
  const sortedCommentInfoes = serializeCommentTree(sortedCommentTreeRoot);
  return sortedCommentInfoes;
}
