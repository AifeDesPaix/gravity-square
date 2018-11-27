import { radientToDegree } from '../Utils/cameraUtils'
import { getVelocityConf } from '../service/velocity'

export function cameraConfig (scene, player) {
  scene.cameras.main.startFollow(player)
  scene.cameras.main.zoom = 4
}

export function rotateCamera (scene, initialPosition, player) {
  setTimeout(() => {
    if (radientToDegree(scene.cameras.main.rotation) >= radientToDegree(initialPosition) - 90) {
      player.angle += 0.8
      smoothRotate(scene)
      rotateCamera(scene, initialPosition, player)
    } else {
      clearTimeout()
    }
  }, 0.02)
/*  player.body.setVelocityX(getVelocityConf().gY)
  player.body.setVelocityY(getVelocityConf().gX)*/
}

function smoothRotate (scene) {
  scene.cameras.main.rotation -= 0.01
}
