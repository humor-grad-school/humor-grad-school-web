import { BoardData } from './BoardActions';

export interface BoardState {
  boards: {
    [key: string]: BoardData;
  };
}

export const initialBoardState: BoardState = {
  boards: {},
};
