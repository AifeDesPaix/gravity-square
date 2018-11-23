import Phaser from 'phaser';

import constants from './config/constants';
import MenuScene from './scenes/menu';

const config = {
  type: Phaser.AUTO,
  width: constants.WIDTH,
  height: constants.HEIGHT,
  physics: {
    default: 'arcade',
    arcade: {
      // gravity: {
      //   y: 200,
      // },
      debug: true, // todo ranger dans manager debug node ENV
    },
  },
  scene: [MenuScene],
};

// eslint-disable-next-line no-new
new Phaser.Game(config);

if (module.hot) {
  module.hot.accept(() => {
  });

  module.hot.dispose(() => {
    window.location.reload();
  });
}
