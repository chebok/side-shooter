import { AUTO, Game, Types} from 'phaser';
import { PreloadScene } from './scenes/preload.scene';
import { GameScene } from './scenes/game.scene';
import { BootstrapScene } from './scenes/bootstrap.scene';
import { StartScene } from './scenes/start.scene';

const config: Types.Core.GameConfig = {
  type: AUTO,
  width: 1280,
  height: 720,
  physics: {
    default: 'arcade',
    arcade: {
      //gravity: { y: 0 },
      debug: false,
    }
  },
  scene: [BootstrapScene, PreloadScene, StartScene, GameScene],
  // scale: {
  //   zoom: 2
  // }
};

const game = new Game(config);