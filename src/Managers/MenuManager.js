import _Manager from './_Manager';
import StartButton from '../assets/btn_start_2.png';
import TestButton from '../assets/btn_test.png';
import GameScene from '../scenes/game';
import TestScene from '../scenes/test';

export default class MenuManager extends _Manager {
  preload() {
    this.scene.load.spritesheet('btn_start', StartButton, {
      frameWidth: 84,
      frameHeight: 46,
    });

    /* Button to open the Test Scene */
    this.scene.load.spritesheet('btn_test', TestButton, {
      frameWidth: 84,
      frameHeight: 46,
    });

    this.width = this.scene.cameras.main.width;
    this.height = this.scene.cameras.main.height;

    this.menuBox = this.scene.add.graphics();
    this.menuBox.fillStyle(0xfafafa, 0.8);
    this.menuBox.fillRect(this.width * 0.1, this.height * 0.1, this.width * 0.8, this.height * 0.8);
  }

  create() {
    // Add the open game button to the scene
    this.startBtn = this.scene.physics.add.sprite(this.width / 2, this.height / 2, 'btn_start').setInteractive();
    // this.startBtn.setScale(0.2, 0.2);
    this.startBtn.on('pointerdown', this.actionOnClick);

    // Add the test scene button
    this.testBtn = this.scene.physics.add.sprite(this.width / 2, (this.height / 3) * 2, 'btn_test').setInteractive();
    this.testBtn.on('pointerdown', this.actionTestOnClick);
  }

  actionOnClick() {
    this.scene.scene.add('Game', GameScene).start('Game');
    this.destroy();
  }

  actionTestOnClick() {
    this.scene.scene.add('Test', TestScene).start('Test');
    this.destroy();
  }

  destroy() {
    this.menuBox.destroy();
    this.startBtn.destroy();
    this.testBtn.destroy();
  }
}
