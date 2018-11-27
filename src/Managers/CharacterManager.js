import _Manager from './_Manager'
import DefaultCharacterObject from '../Objects/Characters/Default'
import { cameraConfig } from '../service/camera'
import { setVelocity } from '../service/velocity'
import { Direction } from '../config/constants'

export default class CharacterManager extends _Manager {
  constructor (scene) {
    super(scene)
    this.loadObjects()
  }

  loadObjects () {
    this.character = new DefaultCharacterObject()
  }

  preload () {
    this.scene.load.spritesheet(this.character.name, this.character.file, {
      frameWidth: 32,
      frameHeight: 29
    })
  }

  create () {
    // Create Player
    this.player = this.scene.physics.add.sprite(800 - 64, 800 - 64, this.character.name)
    this.player.setScale(0.5, 0.5)
    this.animations()
    this.config()
  }

  config () {
    this.player.body.setGravityY(0)
    this.player.body.setGravityX(0)
    // this.player.setBounce(0.001);
    this.player.setCollideWorldBounds(true)
    this.player.setVelocityX(-400)
    this.player.body.setAllowGravity(false)
    cameraConfig(this.scene, this.player)
  }

  animations () {
    this.scene.anims.create({
      key: 'left',
      frames: this.scene.anims.generateFrameNumbers(this.character.name, {
        start: 0,
        end: 3
      }),
      frameRate: 10,
      repeat: -1
    })

    this.scene.anims.create({
      key: 'turn',
      frames: [{
        key: this.character.name,
        frame: 4
      }],
      frameRate: 20
    })

    this.scene.anims.create({
      key: 'right',
      frames: this.scene.anims.generateFrameNumbers(this.character.name, {
        start: 5,
        end: 8
      }),
      frameRate: 10,
      repeat: -1
    })
  }

  update () {
    this.scene.cursors = this.scene.input.keyboard.createCursorKeys()
    if (this.scene.cursors.left.isDown) {
      this.changeVelocity(Direction.LEFT)
      this.player.anims.play('left', true)
    } else if (this.scene.cursors.up.isDown) {
      this.changeVelocity(Direction.TOP)
      this.player.anims.play('turn', true)
    } else if (this.scene.cursors.down.isDown) {
      this.changeVelocity(Direction.BOTTOM)
      this.player.anims.play('turn', true)
    } else if (this.scene.cursors.space.isDown) {
      // console.log('a');
      // this.player.setVelocityX(-100);
      // this.player.anims.play('turn');
    }
  }

  changeVelocity (direction) {
    let velocityConf = setVelocity(direction)
    this.player.body.setVelocityX(velocityConf.gX)
    this.player.body.setVelocityY(velocityConf.gY)
  }
}
