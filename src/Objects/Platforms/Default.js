import _PhaserObject from '../_PhaserObject';
import ground from '../../assets/ground.png';

export default class DefaultPlatformObject extends _PhaserObject {
  constructor() {
    super();
    this.name = 'Platform';
    this.file = ground;
  }
}
