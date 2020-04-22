import React, { FC, useState } from 'react'

import House from './house'
import { Player, Message } from '../helpers/enums.helper'
import { getBasePositions, getWinner } from '../helpers/board.helper'

interface IBoardSetting { }

const Board: FC<IBoardSetting> = () => {
  const [player, setPlayer] = useState(Player.x)
  const [message, setMessage] = useState(Message.none)
  const [history, setHistory] = useState<any[][]>([])
  const [positions, setPositions] = useState(getBasePositions())
  const [winner, setWinner] = useState<number[]>()

  const getChangePlayer = () => player === Player.x ? Player.o : Player.x

  const back = () => {
    if (history.length === 0) return

    const newHistory = history.slice()
    const newPositions = newHistory.pop()

    !winner && setPlayer(getChangePlayer())
    setMessage(Message.none)
    setHistory(newHistory)
    setPositions(newPositions!)
    setWinner(undefined)
  }

  const clear = () => {
    setPlayer(Player.x)
    setMessage(Message.none)
    setHistory([])
    setPositions(getBasePositions())
    setWinner(undefined)
  }

  const change = (avariable: boolean, index: number) => {
    if (winner) return
    if (!avariable) return setMessage(Message.invalidPlay)

    setHistory([...history, positions.slice()])

    const newPositions = positions.slice()
    newPositions[index] = player
    setPositions(newPositions)

    const newWinner = getWinner(newPositions)
    if (newWinner) {
      setWinner(newWinner)
      setMessage(Message.winner)
    } else setPlayer(getChangePlayer())
  }

  const rows = [positions.slice(0, 3), positions.slice(3, 6), positions.slice(6, 9)]

  return <div>
    {
      rows.map((row, indexRow) =>
        <div className="row" key={indexRow}>
          {
            row.map((column, indexColumn) =>
              <House
                key={indexColumn}
                position={column}
                event={(avariable: boolean) => change(avariable, indexRow * 3 + indexColumn)}
                rail={winner !== undefined && winner.includes(indexRow * 3 + indexColumn)}
              />
            )
          }
        </div>
      )
    }
    <div className="buttons">
      <button onClick={clear}>Novo</button> <button onClick={back}>Voltar</button>
    </div>
    <div className="messages">
      <div className="player">É a vez do jogador {player}</div>
      <div className="message">{message.replace('[0]', player)}</div>
    </div>
  </div>
}

export default Board
