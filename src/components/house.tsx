import React, { FC } from 'react'

import { Position } from '../helpers/types.helper'

interface IPositionSetting {
  position: Position,
  rail: boolean,
  event: Function
}

const House: FC<IPositionSetting> = ({ position, rail, event }) => {
  const avariable = position.value === undefined
  const className = 'house' + (!avariable ? ' unavailable' : '') + (rail ? ' rail' : '')
  const click = () => event(avariable)

  return <div className={className} onClick={click}>{position.value || position.index}</div>
}

export default House
