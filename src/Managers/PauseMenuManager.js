import _Manager from './_Manager';

export default class PauseMenuManager extends _Manager {
  preload() {
    this.width = this.scene.cameras.main.width;
    this.height = this.scene.cameras.main.height;

    this.menuBox = this.scene.add.graphics();
    this.menuBox.fillStyle(0xfafafa, 1);
    this.menuBox.fillRect(this.width * 0.1, this.height * 0.1, this.width * 0.8, this.height * 0.8);
  }

  create() {
    this.scene.make.text({
      x: this.width / 2,
      y: this.height / 2,
      text: 'RESUME',
      style: {
        font: '20px roboto',
        fill: '#00000',
      },
    }).setInteractive().on('pointerdown', () => {
      // key : 'Game'
      this.scene.scene.resume('Game');
      this.scene.scene.sleep();
    });
  }
}
