export default class _PhaserObject {
  constructor() {
    if (new.target === _PhaserObject) {
      throw new TypeError('Cannot construct Abstract instances directly');
    }

    this.name = null;
    this.file = null;
  }
}
