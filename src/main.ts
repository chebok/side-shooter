import { AUTO, Game, Types} from 'phaser';
import { PreloadScene } from './scenes/preload.scene';

const config: Types.Core.GameConfig = {
  type: AUTO,
  backgroundColor: '#125555',
  width: 400,
  height: 250,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      //debug: true,
    }
  },
  scene: [PreloadScene],
  scale: {
    zoom: 2
  }
};

const game = new Game(config);