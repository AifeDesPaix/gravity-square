import _PhaserObject from '../_PhaserObject';
import shuriken from '../../assets/shuriken.png';

export default class Shuriken extends _PhaserObject {
  constructor() {
    super();
    this.name = 'Shuriken';
    this.file = shuriken;
  }
}
