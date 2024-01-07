import { Scene } from 'phaser';

export class PreloadScene extends Scene {

  constructor() {
    super('preload')
  }

  init() {
  }

  preload() {
    // Preload assets ----------------
    this.load.atlas('dragon', 'sprites/dragon.png', 'sprites/dragon.json');
    this.load.atlas('enemy', 'sprites/enemy.png', 'sprites/enemy.json');

    this.load.image('fire', 'sprites/fire.png', );
  } 

  async create() {
    this.scene.start('start')
  }

}