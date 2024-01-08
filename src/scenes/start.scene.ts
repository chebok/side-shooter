import { Input, Scene } from 'phaser';

export class StartScene extends Scene {

  constructor() {
    super('start')
  }

  init() {
  }

  preload() {
  } 

  create(data: any) {
    this.createBackground();

    if(data.score) {
      this.createStats(data);
    }

    this.createText()

    this.setEvents();
  }

  setEvents() {
    this.input.on('pointerdown', this.handleClick, this);
  }

  createStats(data: any) {
    this.add.graphics()
      .fillStyle(0x000000, 0.5)
      .fillRoundedRect(
        +this.sys.game.config.width / 2 - 200,
        +this.sys.game.config.height / 2 - 200,
        400,
        400,
        5
      );

    const textTile = data.completed ? 'Level completed!' : 'Game Over';
    const textScore = `Score: ${data.score}`;
    const textStyle = {
      font: '40px CurseCasual',
      color: '#ffffff',
    };

    this.add.text(
      +this.sys.game.config.width / 2, 
      250, 
      textTile,
      textStyle
    ).setOrigin(0.5);

    this.add.text(
      +this.sys.game.config.width / 2, 
      350, 
      textScore,
      textStyle
    ).setOrigin(0.5)
  }

  createText() {
    this.add.text(
      +this.sys.game.config.width / 2,
      500,
      'Tap to start',
      {
        font: '40px CurseCasual',
        color: '#ffffff',
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