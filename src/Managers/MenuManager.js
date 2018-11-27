import _Manager from './_Manager';
import StartButton from '../assets/btn_start_2.png';
import GameScene from '../scenes/game';
// import Webservice from '../webservice/webservice';

export default class MenuManager extends _Manager {
  preload() {
    this.scene.load.spritesheet('btn_start', StartButton, {
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
    this.startBtn = this.scene.physics.add.sprite(this.width / 2, this.height / 2, 'btn_start').setInteractive();

    this.userBtn = this.scene.physics.add.sprite(this.width / 2, (this.height / 2) + 56, 'btn_start').setInteractive();

    this.startBtn.on('pointerdown', this.actionOnClick);
    // this.userBtn.on('pointerdown', MenuManager.newUser);
  }

  // static newUser() {
  //   const Userservice = new Webservice('users');
  //   console.log(Userservice.create({
  //     first: 'Paul',
  //     middle: 'Thomas',
  //     last: 'Anderson',
  //     born: 2028,
  //   }));
  // }

  actionOnClick() {
    this.scene.scene.add('Game', GameScene).start('Game');
    this.destroy();
  }

  destroy() {
    this.menuBox.destroy();
    this.startBtn.destroy();
  }
}
