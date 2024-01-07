import { GameObjects, Math, Physics, Types} from 'phaser'
import { GameScene } from '../scenes/game.scene';
import { AutoMovableSprite } from './movable.sprite';

export class Enemy extends AutoMovableSprite {


  static generate(scene: GameScene) {
    const x = +scene.game.config.width - 100;
    const y = Math.Between(100, +scene.game.config.height - 100);
    const texture = 'enemy';
    const frame = `enemy${Math.Between(1, 4)}`;
    return new Enemy(
      { scene, x, y, texture, frame, speed: -200 }
    )
  }

  override reset() {
    const x = +this.scene.game.config.width - 100;
    const y = Math.Between(100, +this.scene.game.config.height - 100);
    const frame = `enemy${Math.Between(1, 4)}`;

    super.reset(x, y);
    
    this.setFrame(frame);
    this.setAlive(true);
  }

  isOut() {
    return this.x > (+this.scene.game.config.width + this.width)
  }
}