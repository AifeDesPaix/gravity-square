export default class _Manager {
  constructor (scene) {
    if (new.target === _Manager) {
      throw new TypeError('Cannot construct Abstract instances directly')
    }
    this.scene = scene
  }

  preload () {
  }

  create () {
  }

  update () {
  }
}
