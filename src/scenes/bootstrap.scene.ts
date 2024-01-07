import { Scene } from 'phaser';

export class BootstrapScene extends Scene {

  constructor() {
    super('bootstrap')
  }

  preload() {
    this.load.image('bg', 'sprites/background.png');
  } 

  create() {
    this.scene.start('preload')
  }
}