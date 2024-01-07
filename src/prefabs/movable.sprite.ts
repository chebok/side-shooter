import { GameObjects, Math, Physics, Types} from 'phaser'
import { GameScene } from '../scenes/game.scene';

export abstract class AutoMovableSprite extends Physics.Arcade.Sprite {
  scene: GameScene;
  private speed!: number;

  constructor(
    data: {
      scene: GameScene,
      x: number,
      y: number,
      speed: number,
      texture: string | Phaser.Textures.Texture,
      frame?: string | number
    }
  ) {
    super(data.scene, data.x, data.y, data.texture, data.frame);
    this.scene = data.scene;

    this.init(data);
    
  }

  init(
    data: {
      scene: GameScene,
      x: number,
      y: number,
      speed: number,
      texture: string | Phaser.Textures.Texture,
      frame?: string | number
    }
  ) {
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);


    this.scene.physics.world.enable(this);

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
    this.x = x;
    this.y = y;
  };

  abstract isOut(): boolean;

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
}