import { GameObjects, Physics, Time, Types} from 'phaser'
import { GameScene } from '../scenes/game.scene';
import { Projectile } from './projectile';
import { Projectiles } from './projectiles';

export class Player extends Physics.Arcade.Sprite {
  scene: GameScene;
  private speed!: number;
  projectiles!: Projectiles;
  countFires = 10;
  timer!: Time.TimerEvent;
  bullet: any;

  constructor(
      scene: GameScene,
  ) {
    super(scene, 150, +scene.game.config.height / 2, 'dragon', 'dragon1',
    );
    this.scene = scene;

    this.init();
    

    const frames = this.scene.anims.generateFrameNames('dragon', {
      prefix: 'dragon',
      start: 1,
      end: 6,
    })

    this.scene.anims.create({
      key: 'dragon-fly',
      frames,
      frameRate: 10,
      repeat: -1,
    })

    this.play('dragon-fly')
  }

  init() {
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);


    //this.scene.physics.world.enable(this);
    this.speed = 500;
    // Вроде не надо
    this.body!.enable = true;

    this.bullet = {
      delay: 500, texture: 'fire', speed: 750
    }

    this.projectiles = new Projectiles(this.scene);

    this.timer = this.scene.time.addEvent({
      delay: 500,
      callback: this.shoot,
      callbackScope: this,
      loop: true
    })
  }

  shoot() {
    this.projectiles.createFire(this);
  }

  move(cursors: Types.Input.Keyboard.CursorKeys) {
    this.setVelocity(0, 0);
    if (cursors.left.isDown) {
      this.setVelocityX(-this.speed)
    } else if (cursors.right.isDown) {
      this.setVelocityX(this.speed)
    }
    if (cursors.up.isDown) {
      this.setVelocityY(-this.speed)
    } else if (cursors.down.isDown) {
      this.setVelocityY(this.speed)
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
}