import { PositionBoard, Winner } from "./types.helper";

export const baseBoard: any[][] = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

const build = (row: number, column: number): PositionBoard => ({ row, column })
export const models: PositionBoard[][] = [
    [build(0, 0), build(0, 1), build(0, 2)],
    [build(1, 0), build(1, 1), build(1, 2)],
    [build(2, 0), build(2, 1), build(2, 2)],
    [build(0, 0), build(1, 0), build(2, 0)],
    [build(0, 1), build(1, 1), build(2, 1)],
    [build(0, 0), build(1, 1), build(2, 2)],
    [build(0, 2), build(1, 1), build(2, 0)]
]

export const getWinner = (board: any[][]): Winner | undefined => {
    const winners = models
        .map(model => {
            const value0 = board[model[0].row][model[0].column]
            const value1 = board[model[1].row][model[1].column]
            const value2 = board[model[2].row][model[2].column]

            return { win: (value0 === value1 && value1 === value2), player: value0 }
        });

    return winners.find(winner => winner.win)
}
