import _PhaserObject from '../_PhaserObject';
import shuriken from '../../assets/shuriken.png';
// import shurikenSprite from '../../assets/shuriken-animated.png'; // TEST

export default class Shuriken extends _PhaserObject {
  constructor() {
    super();
    this.name = 'Shuriken';
    this.file = shuriken;
    // this.fileSprite = shurikenSprite;
  }
}
