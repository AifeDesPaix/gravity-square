import screen from '../config/constants';
import _Manager from './_Manager';
import DefaultBackgroudObject from '../Objects/Backgrounds/Default';
import DefaultPlatformObject from '../Objects/Platforms/Default';

export default class MapManager extends _Manager {
  constructor(scene) {
    super(scene);
    this.objets = [];
    this.loadObjects();
  }

  loadObjects() {
    this.background = new DefaultBackgroudObject();
    this.platform = new DefaultPlatformObject();
  }

  preload() {
    this.scene.load.image(this.platform.name, this.platform.file);
    this.scene.load.image(this.background.name, this.background.file);
  }

  create() {
    this.colidable = this.scene.physics.add.staticGroup();
    this.scene.add.image(400, 400, this.background.name);
    this.createMap();
    console.log(this.objets[3]);
  }

  update() {
    // this.gravityChange(Direction.LEFT);
    // return;
    this.objets[0].x = 150;
    this.objets[0].y = 750;

  }

  createMap() {
    const tuileSize = 32;
    const max = screen.WIDTH / tuileSize;

    let x = max / 2;
    let y = max / 2;
    for (let turn = 1; turn < 9; turn += 1) {
      this.putMapSquare({
        from: x,
        to: x + (turn * 3),
      }, {
        from: y,
        to: y,
      });
      x += turn * 3;
      this.putMapSquare({
        from: x,
        to: x,
      }, {
        from: y,
        to: y + (turn * 3),
      });
      y += turn * 3;

      turn += 1;

      this.putMapSquare({
        from: x - (turn * 3),
        to: x,
      }, {
        from: y,
        to: y,
      });
      x -= turn * 3;
      this.putMapSquare({
        from: x,
        to: x,
      }, {
        from: y - (turn * 3),
        to: y,
      });
      y -= turn * 3;
    }
  }

  putMapSquare(width, height) {
    for (let x = width.from; x <= width.to; x += 1) {
      for (let y = height.from; y <= height.to; y += 1) {
        this.putMapCase(x, y);
      }
    }
  }

  putMapCase(x, y) {
    const [xT, yT] = [Math.trunc(x), Math.trunc(y)];
    const tuileSize = 32;
    const max = screen.WIDTH / tuileSize;
    if (xT > max || yT > max) {
      throw Error('Position en dehors');
    }
    this.objets.push(this.colidable.create(
      (tuileSize / 2) + (tuileSize * xT),
      (tuileSize / 2) + (tuileSize * (max - 1 - yT)),
      this.platform.name,
    ));
  }
}
