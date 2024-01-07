import { Input, Scene } from 'phaser';

export class StartScene extends Scene {

  constructor() {
    super('start')
  }

  init() {
  }

  preload() {
  } 

  async create() {
    this.createBackground();

    this.createText()

    this.setEvents();

    
  }

  setEvents() {
    this.input.on('pointerdown', this.handleClick, this);
  }

  createText() {
    this.add.text(
      +this.sys.game.config.width / 2,
      +this.sys.game.config.height / 2,
      'Tap to start',
      {
        font: '40px CurseCasual',
        color: '#000000',
      }
    ).setOrigin(0.5);
  }

  handleClick(pointer: Input.Pointer) {
    this.scene.start('game');
  }

  createBackground() {
    this.add.sprite(0, 0, 'bg').setOrigin(0, 0);
  }
}