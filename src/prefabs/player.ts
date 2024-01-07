import { GameObjects, Physics, Time, Types} from 'phaser'
import { GameScene } from '../scenes/game.scene';
import { Fire } from './fire';
import { Fires } from './fires';

export class Player extends Physics.Arcade.Sprite {
  scene: GameScene;
  speed = 500;
  private fires!: Fires;
  countFires = 10;
  timer!: Time.TimerEvent;

  constructor(
    scene: GameScene,
  ) {
    super(scene, 150, +scene.game.config.height / 2, 'dragon', 'dragon1');
    this.scene = scene;

    this.init();
    
  }

  init() {
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);


    this.scene.physics.world.enable(this);
    // Вроде не надо
    // this.body!.enable = true;

    this.fires = new Fires(this.scene);

    this.timer = this.scene.time.addEvent({
      delay: 500,
      callback: () => {
        this.fires.createFire(this);
      },
      loop: true
    })
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
}