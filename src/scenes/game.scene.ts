import { GameObjects, Scene, Types } from 'phaser';
import { Player } from '../prefabs/player';
import { Enemy } from '../prefabs/enemy';
import { Enemies } from '../prefabs/enemies';

export class GameScene extends Scene {

  private bg!: GameObjects.TileSprite;

  private player!: Player;
  private enemies!: Enemies;
  private enemy!: Enemy;

  private cursors!: Types.Input.Keyboard.CursorKeys;

  constructor() {
    super('game')
  }

  init() {
    this.cursors = this.input.keyboard!.createCursorKeys();
  }

  preload() {
  } 

  async create() {
    this.createBackground();

    this.player = new Player(this);
    this.enemies = new Enemies(this);
  }

  update() {
    this.player.move(this.cursors);

    //this.enemy.move();
    this.bg.tilePositionX += 0.5;
  }

  createBackground() {
    this.bg = this.add.tileSprite(
      0,
      0,
      +this.game.config.width,
      +this.game.config.height,
      'bg'
    ).setOrigin(0, 0);
  }
  
}