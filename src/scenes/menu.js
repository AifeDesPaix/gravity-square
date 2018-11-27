import Phaser from 'phaser'

import MenuManager from '../Managers/MenuManager'

class Menu extends Phaser.Scene {
  constructor () {
    super()
    this.managers = {}
    this.init()
  }

  init () {
    this.initManagers()
  }

  initManagers () {
    this.managers = {
      // sound: new SoundManager(this),
      map: new MenuManager(this)
    }
  }

  preload () {
    Object.values(this.managers)
      .forEach((manager) => {
        manager.preload()
      })
  }

  create () {
    Object.values(this.managers)
      .forEach((manager) => {
        manager.create()
      })
  }

  update () {
    Object.values(this.managers)
      .forEach((manager) => {
        manager.update()
      })
    // this.debug.inputInfo(32, 32); //todo : debug manager en cas de node ENV DEBUG
  }
}

export default Menu
