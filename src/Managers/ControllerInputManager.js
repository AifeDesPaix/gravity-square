import _Manager from './_Manager';
import ButtonLeft from '../assets/ControllerInput/flecheGauche.png';
import ButtonBottom from '../assets/ControllerInput/flecheBas.png';
import ButtonRight from '../assets/ControllerInput/flecheDroit.png';
import ButtonTop from '../assets/ControllerInput/flecheHaut.png';
import GameScene from '../scenes/game';

export default class ControllerInputManager extends _Manager {
  preload() {
    this.scene.load.spritesheet('btn_left', ButtonLeft, {
      frameWidth: 84,
      frameHeight: 46,
    });
    this.scene.load.spritesheet('btn_bottom', ButtonBottom, {
      frameWidth: 84,
      frameHeight: 46,
    });
    this.scene.load.spritesheet('btn_right', ButtonRight, {
      frameWidth: 84,
      frameHeight: 46,
    });
    this.scene.load.spritesheet('btn_top', ButtonTop, {
      frameWidth: 84,
      frameHeight: 46,
    });
  }

  create() {
    this.leftBtn = this.scene.physics.add.sprite(this.width / 2, this.height / 2, 'btn_left').setInteractive();
    this.rightBtn = this.scene.physics.add.sprite(this.width / 2, this.height / 2, 'btn_bottom').setInteractive();
    this.bottomBtn = this.scene.physics.add.sprite(this.width / 2, this.height / 2, 'btn_right').setInteractive();
    this.topBtn = this.scene.physics.add.sprite(this.width / 2, this.height / 2, 'btn_top').setInteractive();
    this.leftBtn.on('pointerdown', this.actionOnClick);
  }

  actionOnClick() {
    this.scene.scene.add('Game', GameScene).start('Game');
    this.destroy();
  }
}
