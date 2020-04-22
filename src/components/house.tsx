import React, { FC } from 'react'

interface IPositionSetting {
  position: any,
  rail: boolean,
  event: Function
}

const House: FC<IPositionSetting> = ({ position, rail, event }) => {
  const avariable = typeof position === 'number'
  const className = 'house' + (!avariable ? ' unavailable' : '') + (rail ? ' rail' : '')
  const click = () => event(avariable)

  return <div className={className} onClick={click}>{position}</div>
}

export default House
