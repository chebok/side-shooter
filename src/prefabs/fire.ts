import { GameObjects, Math, Physics, Types} from 'phaser'
import { GameScene } from '../scenes/game.scene';
import { Player } from './player';
import { AutoMovableSprite } from './movable.sprite';

export class Fire extends AutoMovableSprite {

  static generate(scene: GameScene, player: Player) {
    const x = player.x + player.width / 2;
    const y = player.y;
    const texture = 'fire';
    return new Fire(
      { scene, x, y, texture , speed: 500}
    )
  }

  isOut() {
    return this.x < -this.width || this.x > (+this.scene.game.config.width + this.width);
  }
}