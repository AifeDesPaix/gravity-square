import screen from '../config/constants';
import _Manager from './_Manager';
import DefaultBackgroudObject from '../Objects/Backgrounds/Default';
import DefaultPlatformObject from '../Objects/Platforms/Default';
import ShurikenObject from '../Objects/Obstacles/Shuriken';

export default class MapTestManager extends _Manager {
  constructor(scene) {
    super(scene);
    this.walls = [];
    this.obstacles = [];
    this.loadObjects();
  }

  loadObjects() {
    this.background = new DefaultBackgroudObject();
    this.platform = new DefaultPlatformObject();
    this.shuriken = new ShurikenObject();
  }

  preload() {
    this.scene.load.image(this.platform.name, this.platform.file);
    this.scene.load.image(this.background.name, this.background.fileWhite);
    this.scene.load.image(this.shuriken.name, this.shuriken.file);
  }

  create() {
    this.colidableWalls = this.scene.physics.add.staticGroup();
    this.colidableObstacles = this.scene.physics.add.staticGroup();
    this.scene.add.image(400, 400, this.background.name);
    this.createMap();
    this.putShuriken(0, 0);
    // console.log(this.walls[3]);
  }

  update() {
    // this.gravityChange(Direction.LEFT);
    // return;
    // this.walls[0].x = 150;
    // this.walls[0].y = 750;

  }

  createMap() {
    const tuileSize = 32;
    const max = screen.WIDTH / tuileSize;
    console.log(max);

    let x = max / 2;
    let y = max / 2;
    for (let turn = 1; turn < 5; turn += 1) {
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
    this.walls.push(this.colidableWalls.create(
      (tuileSize / 2) + (tuileSize * xT),
      (tuileSize / 2) + (tuileSize * (max - 1 - yT)),
      this.platform.name,
    ));
  }

  putShuriken(x, y) {
    const [xT, yT] = [Math.trunc(x), Math.trunc(y)];
    const tuileSize = 32;
    const max = screen.WIDTH / tuileSize;
    if (xT > max || yT > max) {
      throw Error('Position en dehors');
    }
    this.obstacles.push(this.colidableObstacles.create(
      (tuileSize / 2) + (tuileSize * xT),
      (tuileSize / 2) + (tuileSize * (max - 1 - yT)),
      this.shuriken.name,
    ));
  }
}
