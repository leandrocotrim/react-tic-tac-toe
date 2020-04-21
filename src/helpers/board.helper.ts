import { Winner, BoardState, Player, Position } from "./types.helper";

const getBaseHistory = (): any[][] => []
const getBasePositions = (): Position[] => [...Array(9)].map((_, index) => ({ index }))
export const models: number[][] = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
]

export const getWinner = (positions: Position[]): Winner | undefined => {
  const board = positions.map(position => position.value)
  const winners = models
    .map(model => {
      const win = board[model[0]] !== undefined &&
        board[model[0]] === board[model[1]] &&
        board[model[1]] === board[model[2]]

      return { win, player: board[model[0]], model }
    });

  return winners.find(winner => winner.win)
}

export const getDefaultBoard = (): BoardState => {
  return {
    positions: getBasePositions(),
    history: getBaseHistory(),
    player: Player.x,
    message: undefined
  }
}
