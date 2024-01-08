import { Animations, GameObjects, Math, Physics, Scenes, Time, Types} from 'phaser'
import { GameScene } from '../scenes/game.scene';
import { AutoMovableSprite } from './movable.sprite';
import { Projectiles } from './projectiles';

export class Enemy extends Physics.Arcade.Sprite {

  scene: GameScene;
  private speed!: number;

  private projectiles!: Projectiles;
  countFires = 10;
  timer!: Time.TimerEvent;
  bullet: any;

  constructor(
    data: {
      scene: GameScene,
      projectiles: Projectiles,
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
    this.projectiles = data.projectiles;
    this.init(data);
    
  }

  static generate(scene: GameScene, projectiles: Projectiles) {
    const x = +scene.game.config.width - 100;
    const y = Math.Between(100, +scene.game.config.height - 100);
    const texture = 'enemy';
    const frame = `enemy${Math.Between(1, 4)}`;
    return new Enemy(
      { scene, projectiles, x, y, texture, frame, speed: -200, 
        bullet: {
          delay: 1000, texture: 'bullet', speed: - 500
        } 
      }
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
      Scenes.Events.UPDATE,
      this.update,
      this,
    )
    this.bullet = data.bullet;
    
    this.timer = this.scene.time.addEvent({
      delay: data.bullet.delay,
      callback: this.shoot,
      callbackScope: this,
      loop: true
    });
  }

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

    this.timer.paused = !status;

    if(!status) {
      this.emit('killed');
    }
  }
  

  move() {
    this.setVelocityX(this.speed);
  }

  

  reset() {
    const x = +this.scene.game.config.width - 100;
    const y = Math.Between(100, +this.scene.game.config.height - 100);
    const frame = `enemy${Math.Between(1, 4)}`;

    this.x = x;
    this.y = y;
    
    this.setFrame(frame);
    this.setAlive(true);
  }

  isOut() {
    return this.x < -this.width;
  }

  shoot() {
    

    this.projectiles.createFire(this)
  }


}