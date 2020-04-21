import { Winner, BoardState, Player } from "./types.helper";

const basePositions: any[] = [...Array(9)].map((_, index) => index)
export const models: number[][] = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
]

export const getWinner = (board: any[]): Winner | undefined => {
  const winners = models
    .map(model => {
      const win = board[model[0]] === board[model[1]] && board[model[1]] === board[model[2]]
      return { win, player: board[model[0]], model }
    });

  return winners.find(winner => winner.win)
}

export const defaultBoard: BoardState = {
  positions: basePositions,
  history: [],
  player: Player.x,
  message: undefined
}
