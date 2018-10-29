import Phaser from 'phaser';

import SoundManager from '../Managers/SoundManager';
import CharacterManager from '../Managers/CharacterManager';
import MapManager from '../Managers/MapManager';
import LoadingManager from '../Managers/LoadingManager';

class Game extends Phaser.Scene {
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
      sound: new SoundManager(this),
      loading: new LoadingManager(this),
      map: new MapManager(this),
      character: new CharacterManager(this),
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
    // Add physic player + map
    this.physics.add.collider(this.managers.character.player, this.managers.map.colidable);
  }

  update() {
    Object.values(this.managers)
      .forEach((manager) => {
        manager.update();
      });
    // this.debug.inputInfo(32, 32); todo : debug manager en cas de node ENV DEBUG
  }
}

export default Game;
