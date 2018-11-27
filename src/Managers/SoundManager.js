import aOgg from '../assets/CHARBERTLAPUTE.ogg'
import aMp3 from '../assets/CHABERTLAPUTE.mp3'
import _Manager from './_Manager'

const SOUND = 'sonSaMereLaLol'

export default class SoundManager extends _Manager {
  preload () {
    this.scene.load.audio(SOUND, [aOgg, aMp3])
  }

  create () {
    this.scene.sound.add(SOUND, { loop: true })
      .play()
  }
}
