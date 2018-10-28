import Phaser from 'phaser';

import sky from '../assets/sky.png';
import ground from '../assets/platform.png';
import dude from '../assets/dude.png';
import ground2 from '../assets/ground.png';

import screen from '../config/constants';

const Direction = Object.freeze({
  TOP: 0,
  BOTTOM: 1,
  RIGHT: 2,
  LEFT: 3,
});

class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'Game' });
  }

  preload() {
    this.load.image('sky', sky);
    this.load.image('ground', ground);
    this.load.image('ground2', ground2);
    this.load.spritesheet('dude', dude, { frameWidth: 32, frameHeight: 29 });

    // this.load.tilemap('level', '../map.json', null, Phaser.Tilemap.TILED_JSON);
    // this.load.image('tiles', '/images/terrain_atlas.png');
  }

  addSquare() {
    console.log('aaa');
    this.createMap();
    // this.platforms.create(0, 0);
    // this.platforms.create(400, 300, 'ground');
  }

  create() {
    // add Sky background sprit
    // this.map = this.add.tilemap('level');
    this.add.image(400, 400, 'sky');

    // Create ground platforms
    this.platforms = this.physics.add.staticGroup();
    // this.platforms
    //   .create(400, 568, 'ground')
    //   .setScale(2)
    //   .refreshBody();

    this.addSquare();
    // this.platforms.create(90, 250, 'ground');
    // this.platforms.create(750, 220, 'ground');

    // Create Player
    this.player = this.physics.add.sprite(100, 450, 'dude');
    this.player.body.setGravityY(0);
    this.player.body.setGravityX(0);
    // this.player.setBounce(0.001);
    this.player.setCollideWorldBounds(true);
    this.player.setVelocityX(0);
    this.player.setVelocityY(0);

    // Create player animation
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'dude', frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    // set collides between Player and grounds
    this.physics.add.collider(this.player, this.platforms);
  }

  update() {
    // Create movement controller
    this.cursors = this.input.keyboard.createCursorKeys();
    if (this.cursors.left.isDown) {
      this.gravityChange(Direction.LEFT);
      this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      this.gravityChange(Direction.RIGHT);
      this.player.anims.play('right', true);
    } else if (this.cursors.up.isDown) {
      this.gravityChange(Direction.TOP);
      this.player.anims.play('turn', true);
    } else if (this.cursors.down.isDown) {
      this.gravityChange(Direction.BOTTOM);
      this.player.anims.play('turn', true);
    } else {
      // this.player.setVelocityX(300);
      // this.player.anims.play('turn');
    }

    // if (this.cursors.up.isDown && this.player.body.touching.down) {
    // this.player.setVelocityY(-450);
    // }
  }

  gravityChange(direction) {
    const patate = 500;
    const conf = { gY: 0, gX: 0 };
    switch (direction) {
      case Direction.TOP:
        conf.gY = -1 * patate;
        break;
      case Direction.BOTTOM:
        conf.gY = patate;
        break;
      case Direction.LEFT:
        conf.gX = -1 * patate;
        break;
      case Direction.RIGHT:
        conf.gX = patate;
        break;
      default:
        break;
    }
    // this.player.anims.play('turn', true);
    this.player.body.setGravityY(conf.gY);
    this.player.body.setGravityX(conf.gX);
    this.player.setAccelerationX(conf.gX);
    this.player.setAccelerationY(conf.gY);
  }

  createMap() {
    const tuileSize = 32;
    const max = screen.WIDTH / tuileSize;

    let x = max / 2;
    let y = max / 2;
    for (let turn = 1; turn < 9; turn += 1) {
      this.putMapSquare({ from: x, to: x + turn * 3 }, { from: y, to: y });
      x += turn * 3;
      this.putMapSquare({ from: x, to: x }, { from: y, to: y + turn * 3 });
      y += turn * 3;

      turn += 1;

      this.putMapSquare({ from: x - turn * 3, to: x }, { from: y, to: y });
      x -= turn * 3;
      this.putMapSquare({ from: x, to: x }, { from: y - turn * 3, to: y });
      y -= turn * 3;
      // y += turn * 3;
      // turn += 1;
      // this.putMapSquare({ from: x, to: x + 3 }, { from: y, to: y });
      // x += turn * -3;
      // this.putMapSquare({ from: x, to: x }, { from: y, to: y + 3 });
      // y += turn * -3;
    }

    // this.createMapLineHorizontal(tuileSize * 0, tuileSize * 1, tuileSize * 24);
    // this.createMapLineHorizontal(tuileSize * 3, tuileSize * 4, tuileSize * 17);
    // this.createMapLineHorizontal(tuileSize * 6, tuileSize * 6, tuileSize * 12);
    // this.createMapLineHorizontal(tuileSize * 12, tuileSize * 3, tuileSize * 16);
    // this.createMapLineHorizontal(tuileSize * 15, tuileSize * 1, tuileSize * 21);
    // this.createMapLineHorizontal(tuileSize * 18, tuileSize * 0, tuileSize * 25);

    // this.createMapLineVertical(tuileSize * 1, tuileSize * 0, tuileSize * 16);
    // this.createMapLineVertical(tuileSize * 4, tuileSize * 3, tuileSize * 9);
    // this.createMapLineVertical(tuileSize * 7, tuileSize * 7, tuileSize * 4);
    // this.createMapLineVertical(tuileSize * 19, tuileSize * 6, tuileSize * 6);
    // this.createMapLineVertical(tuileSize * 22, tuileSize * 3, tuileSize * 12);
    // this.createMapLineVertical(tuileSize * 25, tuileSize * 0, tuileSize * 18);

    // let row = 1;
    // const col = 1;
    // do {
    //   console.log('max');
    //   console.log(max);
    //   console.log(row);
    //   // this.createMapLineVertical(tuileSize * (1 + row), tuileSize * row, (max - row) * tuileSize);
    //   // this.createMapLineVertical(
    //   //   tuileSize * (max - row),
    //   //   tuileSize * row,
    //   //   (max - row * z * 2) * tuileSize,
    //   // );
    //   this.createMapLineVertical(
    //     max * tuileSize,
    //     tuileSize * (row - 1),
    //     (max - (row - 1) * 2) * tuileSize,
    //   );
    //   this.createMapLineVertical(
    //     row * tuileSize,
    //     tuileSize * (row - 1),
    //     (max - row * 2) * tuileSize,
    //   );
    //   this.createMapLineHorizontal(
    //     (max - row) * tuileSize,
    //     tuileSize * (row - 1),
    //     (max - row * 2 + 1) * tuileSize,
    //   );
    //   this.createMapLineHorizontal(
    //     (row - 1) * tuileSize,
    //     tuileSize * (row - 1 + 3),
    //     (max - row * 2) * tuileSize,
    //   );
    //   row += 3;
    //   //   this.createMapLineHorizontal(0, 0, screen.WIDTH);
    //   // this.createMapLineHorizontal(32 + x * 32, x * 32, screen.WIDTH);
    //   // this.createMapLineVertical(screen.WIDTH, 0, screen.HEIGHT);
    //   // this.createMapLineVertical(32 + y * 32, y * 32, screen.HEIGHT - x * 32);
    //   z += 1;
    // } while (z < 5);

    // this.createMapLineHorizontal(screen.HEIGHT - 3 * 32, 0, screen.WIDTH - 3 * 32);
    // let i = 0;
    // do {
    //   this.platforms.create(16 + 32 * i, screen.HEIGHT - 16, 'ground2');
    //   i += 1;
    // } while (screen.WIDTH > i * 32 + 16);
    // .scale.setTo(2, 1);
  }

  // createMapLineHorizontal(y, xFrom, xTo) {
  //   let i = 0;
  //   do {
  //     this.platforms.create(xFrom + 16 + 32 * i, y + 16, 'ground2');
  //     i += 1;
  //   } while (xTo > i * 32 + 16);
  // }

  // createMapLineVertical(x, yFrom, yTo) {
  //   let i = 0;
  //   do {
  //     this.platforms.create(x - 16, yFrom + 16 + 32 * i, 'ground2');
  //     i += 1;
  //   } while (yTo > i * 32 + 16);
  // }

  putMapCase(x, y) {
    const tuileSize = 32;
    const max = screen.WIDTH / tuileSize;
    if (x > max || y > max) {
      throw Error('Position en dehors');
    }
    this.platforms.create(
      tuileSize / 2 + tuileSize * x,
      tuileSize / 2 + tuileSize * (max - 1 - y),
      'ground2',
    );
  }

  putMapSquare(width, height) {
    console.log('x, y', width, height);
    for (let x = width.from; x <= width.to; x += 1) {
      for (let y = height.from; y <= height.to; y += 1) {
        this.putMapCase(x, y);
      }
    }
  }
}

export default Game;
