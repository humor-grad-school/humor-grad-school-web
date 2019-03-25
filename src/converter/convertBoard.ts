import { BoardData, BoardInfo } from '../types/BoardData';

// ---
// content:
//   -
//     type: text
//     content: you can put text content here.
//   -
//     type: image
//     source: https://image.com/image

// TODO: Check error, If needed

export default function convertPost(boardInfo: BoardInfo): BoardData {
  const boardData: BoardData = {
    ...boardInfo,
  };
  return boardData;
}
