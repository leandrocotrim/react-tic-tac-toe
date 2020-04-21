import React, { FC } from 'react'

interface IPositionSetting {
  value: number | string,
  rail: boolean,
  event: Function
}

const Position: FC<IPositionSetting> = ({ value, rail, event }) => {
  const avariable = typeof value === 'number'
  const className = 'position' + (!avariable ? ' unavailable' : '') + (rail ? ' rail' : '')
  const click = () => event(avariable)

  console.log([value, rail, event])

  return <div className={className} onClick={click}>{value}</div>
}

export default Position
