type CommentSortData = {
  id: number;
  createdAt: Date;
  parentComment?: ParentCommentSortData;
}

type ParentCommentSortData = {
  id: number;
  parentComment?: CommentSortData;
}

function compareCommentInfoByCreatedAt<TCommentData extends CommentSortData>(
  a: TCommentData,
  b: TCommentData,
): number {
  const aDate = new Date(a.createdAt);
  const bDate = new Date(b.createdAt);

  return aDate.getTime() - bDate.getTime();
}

function getMeAndDescendants<TCommentData extends CommentSortData>(
  meCommentInfo: TCommentData,
  commentInfos: TCommentData[],
): TCommentData[] {
  const childCommentInfos = commentInfos
    .filter(otherCommentInfo => otherCommentInfo.parentComment
      && otherCommentInfo.parentComment.id === meCommentInfo.id)
    .sort(compareCommentInfoByCreatedAt);

  const descendants = childCommentInfos.reduce((prev, childCommentInfo) => ([
    ...prev,
    ...getMeAndDescendants(childCommentInfo, commentInfos),
  ]), [] as TCommentData[]);

  return [
    meCommentInfo,
    ...descendants,
  ];
}

export default function sortComments<TCommentData extends CommentSortData>(
  commentInfos: TCommentData[],
): TCommentData[] {
  const rootCommentInfos = commentInfos
    .filter(commentData => !commentData.parentComment)
    .sort(compareCommentInfoByCreatedAt);

  return rootCommentInfos.reduce((prev, rootCommentInfo) => ([
    ...prev,
    ...getMeAndDescendants(rootCommentInfo, commentInfos),
  ]), [] as TCommentData[]);
}
