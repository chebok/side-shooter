import { GameObjects, Math, Physics, Types} from 'phaser'
import { GameScene } from '../scenes/game.scene';
import { Player } from './player';
import { AutoMovableSprite } from './movable.sprite';
import { Enemy } from './enemy';

export class Projectile extends Physics.Arcade.Sprite {

  scene: GameScene;
  private speed!: number;

  constructor(
    data: {
      scene: GameScene,
      x: number,
      y: number,
      speed: number,
      texture: string | Phaser.Textures.Texture,
      bullet: any,
      frame?: string | number
    }
  ) {
    super(data.scene, data.x, data.y, data.texture, data.frame);
    this.scene = data.scene;

    this.init(data);
    
  }

  static generate(scene: GameScene, source: Player | Enemy) {
    const x = source.x;
    const y = source.y;
    const { texture, speed } = source.bullet;
    return new Projectile(
      { scene, x, y, texture , speed, bullet: source.bullet }
    )
  }

  init(
    data: {
      scene: GameScene,
      x: number,
      y: number,
      speed: number,
      texture: string | Phaser.Textures.Texture,
      bullet: any,
      frame?: string | number
    }
  ) {
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);


    //this.scene.physics.world.enable(this);

    // Вроде тож не надо
    
    this.body!.enable = true;

    this.speed = data.speed;

    this.scene.events.on(
      'update',
      this.update,
      this,
    )
    
  }

  reset(x:number, y: number): void {
    this.setAlive(true);
    this.x = x;
    this.y = y;
  };


  update() {
    // Объект активный и выехал за экран
    if (this.active && this.isOut()) {
      this.setAlive(false)
    }

  }

  setAlive(status: boolean) {
    // Деактивируем физическое тело
    this.body!.enable = status;

    // Скрываем текстуру
    this.setVisible(status);

    // Деактивировать объект
    this.setActive(status)
  }
  

  move() {
    this.setVelocityX(this.speed);
  }

  isOut() {
    return this.x < -this.width || this.x > (+this.scene.game.config.width + this.width);
  }
}