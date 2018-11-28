import Phaser from 'phaser';
import PauseMenuManager from '../Managers/PauseMenuManager';

class PauseMenu extends Phaser.Scene {
  constructor() {
    super();
    this.managers = {};
    this.init();
  }

  init() {
    this.initManagers();
  }

  initManagers() {
    this.managers = {
      pauseMenu: new PauseMenuManager(this),
    };
  }

  preload() {
    Object.values(this.managers)
      .forEach((manager) => {
        manager.preload();
      });
  }

  create() {
    Object.values(this.managers)
      .forEach((manager) => {
        manager.create();
      });
  }

  update() {
    Object.values(this.managers)
      .forEach((manager) => {
        manager.update();
      });
  }
}

export default PauseMenu;
