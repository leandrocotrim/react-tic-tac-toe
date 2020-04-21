export enum Player { x = 'X', o = 'O' }
export enum Message { invalidPosition = 'Posição já preenchida', win = 'Fim de jogo, o jogador atual venceu.' }

export type Winner = { win: boolean, player: any, model: number[] }
export type BoardState = { positions: any[], history: any[][], player: Player, message?: Message, winner?: Winner }
