import _PhaserObject from '../_PhaserObject';
import sky from '../../assets/sky.png';

export default class DefaultBackgroudObject extends _PhaserObject {
  constructor() {
    super();
    this.name = 'Background';
    this.file = sky;
  }
}
