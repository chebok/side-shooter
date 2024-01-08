import { Physics, Scene, Time } from 'phaser';
import { GameScene } from '../scenes/game.scene';
import { Enemy } from './enemy';
import { Projectile } from './projectile';
import { Player } from './player';

export class Projectiles extends Physics.Arcade.Group {
  scene: GameScene;

  constructor(scene: GameScene, ) {
    super(scene.physics.world, scene);
    this.scene = scene;
  } 

  createFire(source: Player | Enemy) {
    let projectile: Projectile;
    projectile = this.getFirstDead();
    if (!projectile) {
      projectile = Projectile.generate(this.scene, source);
      this.add(projectile);
    } else {
      projectile.reset(source.x, source.y);
    }
    
    projectile.move();
  }
}