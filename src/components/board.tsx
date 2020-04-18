import React, { FC, useState } from 'react'

import Position from './position'
import { baseBoard, getWinner } from '../helpers/board.helper'
import { Player, ErrorBoard } from '../helpers/types.helper'

interface IBoardSetting { }

const Board: FC<IBoardSetting> = () => {
  const [board, setBoard] = useState(baseBoard)
  const [history, setHistory] = useState<any[]>([])
  const [player, setPlayer] = useState(Player.x)
  const [error, setError] = useState<ErrorBoard>()
  // const [rails, setRails] = useState<number[][]>([])

  const clear = () => {
    setBoard(baseBoard)
    setHistory([])
  }

  const changePlayer = () => setPlayer(player === Player.x ? Player.o : Player.x)

  const back = () => {
    if (history.length === 0) return;

    const newHistory = history.slice()
    setBoard(newHistory.pop())
    setHistory(newHistory)
    changePlayer()
  }

  const changeBoard = (indexRow: number, indexColumn: number) => {
    const newBoard = board.slice()
    newBoard[indexRow][indexColumn] = player;
    setBoard(newBoard)
    setHistory([...history, board])
    changePlayer()

    console.log(getWinner(newBoard))
  }

  return <div className="board">
    {
      board.map((row, indexRow) =>
        (
          <div className="row" key={indexRow}>
            {
              row.map((column, indexColumn) => (
                <Position
                  key={indexColumn}
                  event={(valid: boolean) => valid ? changeBoard(indexRow, indexColumn) : setError(ErrorBoard.invalidPosition)}
                  rail={false}
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
      <div className="player">É a vez do jogador {player}</div>
      <div className="error">{error}</div>
    </div>
  </div>
}

export default Board
