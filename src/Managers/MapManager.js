/* eslint-disable array-callback-return */
import _Manager from './_Manager';
import DefaultBackgroudObject from '../Objects/Backgrounds/Default';
import DefaultPlatformObject from '../Objects/Platforms/Default';
import Webservice from '../webservice/webservice';
import PauseMenu from '../scenes/pause_menu';

export default class MapManager extends _Manager {
  constructor(scene) {
    super(scene);
    this.objets = [];
    this.loadObjects();
    this.tuileSize = 32;
    this.initialPosX = 25;
    this.mapping = {};
  }

  loadObjects() {
    this.background = new DefaultBackgroudObject();
    this.platform = new DefaultPlatformObject();
  }

  async preload() {
    this.scene.load.image(this.platform.name, this.platform.file);
    this.scene.load.image(this.background.name, this.background.file);

    this.colidable = this.scene.physics.add.staticGroup();

    // On récupère une map en base de données.
    // Si un problème survient pendant la génération de la map,
    // on en récupère une en dur dans le code.
    try {
      const ws = new Webservice('test');
      this.mapping = (await ws.get('5g1Ot2omIKX7M81epEj4')).mapping;
    } catch (e) {
      this.mapping = null;
    }

    if (typeof this.mapping === 'undefined' || this.mapping === null) {
      this.mapping = {
        1: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        2: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        3: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        4: [1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1],
        5: [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
        6: [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
        7: [1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1],
        8: [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1],
        9: [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1],
        10: [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
        11: [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
        12: [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
        13: [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
        15: [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1],
        16: [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1],
        17: [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1],
        18: [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
        19: [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
        20: [1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1],
        21: [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        22: [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        23: [1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        24: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        25: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      };
    }
  }

  create() {
    this.scene.add.image(400, 400, this.background.name);
    this.createMap();

    this.scene.scene.add('PauseMenu', PauseMenu);
    this.scene.make.text({
      x: 0,
      y: 35,
      text: 'PAUSE',
      style: {
        font: '20px roboto',
        fill: '#fafafa',
      },
    }).setInteractive().on('pointerdown', () => {
      this.scene.scene.pause();
      this.scene.scene.launch('PauseMenu');
    });
  }

  async createMap() {
    let y = 30;
    let x = this.initialPosX;

    Object.keys(this.mapping).map((index) => {
      Object.keys(this.mapping[index]).map((ind) => {
        if (this.mapping[index][ind] === 1) {
          this.putMapCase(x, y);
        }
        x += this.tuileSize;
      });
      y += this.tuileSize;
      x = this.initialPosX;
    });
  }

  putMapCase(x, y) {
    this.objets.push(this.colidable.create(
      Math.trunc(x),
      Math.trunc(y),
      this.platform.name,
    ));
  }
}
