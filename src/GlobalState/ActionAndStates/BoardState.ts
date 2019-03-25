import { BoardData } from '../../types/BoardData';

export interface BoardState {
  boards: {
    [key: string]: BoardData;
  };
}

export const initialBoardState: BoardState = {
  boards: {},
};
