import DataLoader from 'dataloader';
import { getGlobalState } from '../getGlobalState';
import {
  Query,
  Post,
  Board,
  User,
  GraphQLQueryType,
} from '../../generated/graphqlQuery';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function generateBoardPostQuery() {
  return Post
    .addId()
    .addTitle()
    .addWriter(
      User
        .addUsername(),
    )
    .addLikes()
    .addCommentCount()
    .addThumbnailUrl()
    .addCreatedAt();
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function generateBoardQuery(
  boardName: string,
  pageNumber: number,
) {
  return Query
    .addBoard(boardName,
      Board
        .addName()
        .addPosts(pageNumber, 25,
          generateBoardPostQuery()));
}

export type BoardData = GraphQLQueryType<ReturnType<typeof generateBoardQuery>>['board'];

export type BoardPostData = GraphQLQueryType<ReturnType<typeof generateBoardPostQuery>>;

async function loadBoardBatch(boardInfos: {
  boardName: string;
  pageNumber: number;
}[]): Promise<BoardData[]> {
  return Promise.all(boardInfos.map(async ({
    boardName,
    pageNumber,
  }) => {
    const query = generateBoardQuery(boardName, pageNumber);

    const { data } = await query.fetch();

    data.board.posts.reverse();

    return data.board;
  }));
}

const boardLoader = new DataLoader<{
  boardName: string;
  pageNumber: number;
}, BoardData>(boardInfos => loadBoardBatch(boardInfos));

const globalState = getGlobalState();

const BoardActions = {
  async loadBoard(boardName: string, pageNumber: number): Promise<void> {
    const boardData = await boardLoader.load({ boardName, pageNumber });
    globalState.boardState.boards[boardName] = boardData;
  },
};

export default BoardActions;
