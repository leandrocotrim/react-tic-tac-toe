export enum Player { x = 'X', o = 'O' }
export enum ErrorBoard { invalidPosition = 'Posição já preenchida' }

export type PositionBoard = { row: number, column: number }
export type Winner = { win: boolean, player: any }
