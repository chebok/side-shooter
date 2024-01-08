import { Animations, GameObjects, Physics, Time, Types} from 'phaser'
import { GameScene } from '../scenes/game.scene';

export class Boom extends Physics.Arcade.Sprite {
  scene: GameScene;

  static generate(scene: GameScene, x: number, y: number) {
    return new Boom(scene, { x, y })
  }
  constructor(
    scene: GameScene,
    data: {
      x: number,
      y: number,
    }
      
  ) {
    super(scene, data.x, data.y, 'boom');
    this.scene = scene;
    this.scene.add.existing(this);
    

    const frames = this.scene.anims.generateFrameNames('boom', {
      prefix: 'boom',
      start: 1,
      end: 4,
    })

    this.scene.anims.create({
      key: 'boom-play',
      frames,
      frameRate: 10,
      repeat: 0,
    });

    this.play('boom-play');
    
    this.once(Animations.Events.ANIMATION_COMPLETE, this.destroy, this);
  }
}