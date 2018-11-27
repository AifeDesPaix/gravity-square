import _Manager from './_Manager';
import DefaultCharacterObject from '../Objects/Characters/Default';

const Direction = Object.freeze({
  TOP: 0,
  BOTTOM: 1,
  RIGHT: 2,
  LEFT: 3,
});

export default class CharacterManager extends _Manager {
  constructor(scene) {
    super(scene);
    this.loadObjects();
  }

  loadObjects() {
    this.character = new DefaultCharacterObject();
  }

  preload() {
    this.scene.load.spritesheet(this.character.name, this.character.file, {
      frameWidth: 32,
      frameHeight: 29,
    });
  }

  create() {
    // Create Player
    this.player = this.scene.physics.add.sprite(800 - 64, 800 - 64, this.character.name);
    this.animations();
    this.config();
  }

  config() {
    this.player.body.setGravityY(0);
    this.player.body.setGravityX(0);
    // this.player.setBounce(0.001);
    this.player.setCollideWorldBounds(true);
    this.player.setVelocityX(-400);
    this.player.body.setAllowGravity(false);
    this.scene.cameras.main.startFollow(this.player);
    this.scene.cameras.main.zoom = 0;
  }

  animations() {
    this.scene.anims.create({
      key: 'left',
      frames: this.scene.anims.generateFrameNumbers(this.character.name, {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.scene.anims.create({
      key: 'turn',
      frames: [{
        key: this.character.name,
        frame: 4,
      }],
      frameRate: 20,
    });

    this.scene.anims.create({
      key: 'right',
      frames: this.scene.anims.generateFrameNumbers(this.character.name, {
        start: 5,
        end: 8,
      }),
      frameRate: 10,
      repeat: -1,
    });
  }

  update() {
    this.scene.cursors = this.scene.input.keyboard.createCursorKeys();
    if (this.scene.cursors.left.isDown) {
      this.gravityChange(Direction.LEFT);
      this.player.anims.play('left', true);
    } else if (this.scene.cursors.right.isDown) {
      this.gravityChange(Direction.RIGHT);
      this.player.anims.play('right', true);
      this.player.setVelocityX(500);
    } else if (this.scene.cursors.up.isDown) {
      this.gravityChange(Direction.TOP);
      this.player.anims.play('turn', true);
    } else if (this.scene.cursors.down.isDown) {
      this.gravityChange(Direction.BOTTOM);
      this.player.anims.play('turn', true);
    } else if (this.scene.cursors.space.isDown) {
      // console.log('a');
      // this.player.setVelocityX(-100);
      // this.player.anims.play('turn');
    }
  }

  gravityChange(direction) {
    const patate = 400;
    const conf = {
      gY: 0,
      gX: 0,
    };
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
}

