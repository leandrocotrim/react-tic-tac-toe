import React, { FC, useState } from 'react'

import Position from './position'
import { defaultBoard, getWinner } from '../helpers/board.helper'
import { Player, Message } from '../helpers/types.helper'

interface IBoardSetting { }

const Board: FC<IBoardSetting> = () => {
  const [board, setBoard] = useState(defaultBoard)

  const getNextPlayer = () => board.player === Player.x ? Player.o : Player.x

  const clear = () => setBoard(defaultBoard)

  const back = () => {
    if (board.history.length === 0) return

    const history = board.history.slice()
    const positions = history.pop()

    setBoard({
      ...board,
      history: history,
      positions: positions!,
      winner: undefined,
      message: undefined
    })
  }

  const changeBoard = (column: number) => {
    if (board.winner) return

    const history = [...board.history, board.positions]
    const positions = board.positions.slice()
    positions[column] = board.player

    const winner = getWinner(positions)

    setBoard({
      ...board,
      history: history,
      positions: positions,
      winner: winner,
      player: winner ? board.player : getNextPlayer(),
      message: winner ? Message.win : undefined
    })
  }

  const click = (valid: boolean, column: any) => {
    if (board.winner !== undefined) return
    valid ? changeBoard(column) : setBoard({ ...board, message: Message.invalidPosition })
  }

  const rows = [board.positions.slice(0, 3), board.positions.slice(3, 6), board.positions.slice(6, 9)]

  return <div className="board">
    {
      rows.map((row, indexRow) =>
        (
          <div className="row" key={indexRow}>
            {              
              row.map((column, indexColumn) => (
                <Position
                  key={indexColumn}
                  event={(valid: boolean) => click(valid, column)}
                  rail={(board.winner !== undefined && board.winner.model.includes(0))}
                  value={column} />
              ))
            }
          </div>
        ))
    }
    <div className="buttons">
      <button onClick={clear}>Novo</button> <button onClick={back}>Voltar</button>
    </div>
    <div className="messages">
      <div className="player">É a vez do jogador {board.player}</div>
      <div className="message">{board.message}</div>
    </div>
  </div>
}

export default Board
