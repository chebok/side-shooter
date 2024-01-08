import { Scene } from 'phaser';
import { LoadingBar } from '../classes/loading-bar';

export class PreloadScene extends Scene {

  constructor() {
    super('preload')
  }

  preload() {
    this.add.sprite(0, 0, 'bg').setOrigin(0, 0);
    const loadingBar = new LoadingBar(this);
    this.preloadAssets();
  }

  preloadAssets() {
    this.load.atlas('dragon', 'sprites/dragon.png', 'sprites/dragon.json');
    this.load.atlas('enemy', 'sprites/enemy.png', 'sprites/enemy.json');
    this.load.atlas('boom', 'sprites/boom.png', 'sprites/boom.json');

    this.load.image('fire', 'sprites/fire.png');
    this.load.image('bullet', 'sprites/bullet.png');

    this.load.audio('boom', 'sounds/boom.mp3');
    this.load.audio('theme', 'sounds/theme.mp3');
  } 

  create() {
    this.scene.start('start')
  }

}