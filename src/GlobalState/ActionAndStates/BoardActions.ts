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

async function loadBoardBatch(boardNames: string[]): Promise<BoardData[]> {
  return Promise.all(boardNames.map(async (boardName) => {
    const query = Query
      .addBoard(boardName,
        Board
          .addName()
          .addPosts(1, 5,
            Post
              .addId()
              .addTitle()
              .addWriter(
                User
                  .addUsername(),
              )
              .addLikes()
              .addCommentCount()
              .addCreatedAt()));

    const { data } = await query.fetch();

    return convertBoard(data.board);
  }));
}

const boardLoader = new DataLoader<string, BoardData>(boardNames => loadBoardBatch(boardNames));

const globalState = getGlobalState();

const BoardActions = {
  async loadBoard(boardName: string): Promise<void> {
    const boardData = await boardLoader.load(boardName);
    globalState.boardState.boards[boardName] = boardData;
  },
};

export default BoardActions;
