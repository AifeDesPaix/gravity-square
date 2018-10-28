import Phaser from 'phaser';

import sky from '../assets/sky.png';
import ground from '../assets/platform.png';
import dude from '../assets/dude.png';
import ground2 from '../assets/ground.png';
import aOgg from '../assets/a.ogg';
import aMp3 from '../assets/a.mp3';

import screen from '../config/constants';

const Direction = Object.freeze({
  TOP: 0,
  BOTTOM: 1,
  RIGHT: 2,
  LEFT: 3,
});

class Game extends Phaser.Scene {
  constructor() {
    super({
      key: 'Game',
      type: Phaser.AUTO,
      parent: 'phaser-example',
      width: 800,
      height: 800,
      pixelArt: true,
    });
  }

  preload() {
    this.addLoading();
    this.load.image('sky', sky);
    this.load.image('ground', ground);
    this.load.audio('sonSaMereLaLol', [aOgg, aMp3]);
    this.load.image('ground2', ground2);
    this.load.spritesheet('dude', dude, { frameWidth: 32, frameHeight: 29 });

    // this.load.tilemap('level', '../map.json', null, Phaser.Tilemap.TILED_JSON);
    // this.load.image('tiles', '/images/terrain_atlas.png');
  }

  addSquare() {
    this.createMap();
    // this.platforms.create(0, 0);
    // this.platforms.create(400, 300, 'ground');
  }

  addLoading() {
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });

    assetText.setOrigin(0.5, 0.5);

    this.load.on('progress', (value) => {
      percentText.setText(`${parseInt(value * 100)}%`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    this.load.on('fileprogress', (file) => {
      assetText.setText(`Loading asset: ${file.key}`);
    });

    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
    });
  }

  create() {
    // add Sky background sprit
    // this.map = this.add.tilemap('level');
    this.add.image(400, 400, 'sky');

    this.sound.add('sonSaMereLaLol', { loop: true }).play();

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
    this.player = this.physics.add.sprite(800 - 64, 800 - 64, 'dude');
    this.player.body.setGravityY(0);
    this.player.body.setGravityX(0);
    // this.player.setBounce(0.001);
    this.player.setCollideWorldBounds(true);
    this.player.setVelocityX(-400);
    this.player.body.setAllowGravity(false);

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
    } else if (this.cursors.space.isDown) {
      // console.log('a');
      // this.player.setVelocityX(-100);
      // this.player.anims.play('turn');
    }
  }

  gravityChange(direction) {
    const patate = 400;
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
    this.player.body.setVelocityX(conf.gX);
    this.player.body.setVelocityY(conf.gY);
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
    }
  }

  putMapCase(x, y) {
    x = Math.trunc(x);
    y = Math.trunc(y);
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
    for (let x = width.from; x <= width.to; x += 1) {
      for (let y = height.from; y <= height.to; y += 1) {
        this.putMapCase(x, y);
      }
    }
  }
}

export default Game;
