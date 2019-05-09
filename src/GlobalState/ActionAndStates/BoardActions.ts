import DataLoader from 'dataloader';
import { getGlobalState } from '../getGlobalState';
import {
  Query,
  Post,
  Board,
  User,
} from '../../generated/graphqlQuery';
import convertBoard from '../../converter/convertBoard';
import { BoardData } from '../../types/BoardData';

async function loadBoardBatch(boardInfos: {
  boardName: string;
  pageNumber: number;
}[]): Promise<BoardData[]> {
  return Promise.all(boardInfos.map(async ({
    boardName,
    pageNumber,
  }) => {
    const query = Query
      .addBoard(boardName,
        Board
          .addName()
          .addPosts(pageNumber, 25,
            Post
              .addId()
              .addTitle()
              .addWriter(
                User
                  .addUsername(),
              )
              .addLikes()
              .addCommentCount()
              .addThumbnailUrl()
              .addCreatedAt()));

    const { data } = await query.fetch();

    return convertBoard(data.board);
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
