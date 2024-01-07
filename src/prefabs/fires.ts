import { Physics, Scene, Time } from 'phaser';
import { GameScene } from '../scenes/game.scene';
import { Enemy } from './enemy';
import { Fire } from './fire';
import { Player } from './player';

export class Fires extends Physics.Arcade.Group {
  scene: GameScene;
  countMax = 10;
  countCreated = 0;

  constructor(scene: GameScene, ) {
    super(scene.physics.world, scene);
    this.scene = scene;
  } 

  createFire(player: Player) {
    let fire;
    fire = this.getFirstDead();

    if (!fire) {
      fire = Fire.generate(this.scene, player);
      this.add(fire);
    } else {
      fire.reset(player.x + player.width/2, player.y);
    }
    
    fire.move();
  }
}