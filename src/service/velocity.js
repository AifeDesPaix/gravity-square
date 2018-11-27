import { Direction } from '../config/constants'

let conf = {
  gY: 0,
  gX: 0
}

export function setVelocity (direction) {
  const power = 400

  switch (direction) {
    case Direction.TOP:
      conf.gY = -1 * power
      break
    case Direction.BOTTOM:
      conf.gY = power
      break
    case Direction.LEFT:
      conf.gX = -1 * power
      break
    case Direction.RIGHT:
      conf.gX = power
      break
    default:
      break
  }
  return conf
}
export function getVelocityConf () {
  return conf
}
