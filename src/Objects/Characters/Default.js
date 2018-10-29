import _PhaserObject from '../_PhaserObject';
import character from '../../assets/dude.png';

export default class DefaultCharacterObject extends _PhaserObject {
  constructor() {
    super();
    this.name = 'Jack';
    this.file = character;
  }
}
