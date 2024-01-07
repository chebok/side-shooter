import { Physics, Scene, Time } from 'phaser';
import { GameScene } from '../scenes/game.scene';
import { Enemy } from './enemy';

export class Enemies extends Physics.Arcade.Group {
  scene: GameScene;
  countMax = 10;
  countCreated = 0;
  timer: Time.TimerEvent;

  constructor(scene: GameScene) {
    super(scene.physics.world, scene);
    this.scene = scene;
    this.timer = this.scene.time.addEvent({
      delay: 1000,
      callback: this.spawnEnemy,
      callbackScope: this,
      loop: true
    })
  } 

  createEnemy() {
    let enemy;
    enemy = this.getFirstDead();

    if (!enemy) {
      enemy = Enemy.generate(this.scene);
      this.add(enemy);
    } else {
      enemy.reset();
    }
    enemy.move();
  }

  spawnEnemy() {
    if (this.countCreated < this.countMax) {
      this.createEnemy();
      this.countCreated++;
    } else {
      this.timer.remove();
    }
    
  }
}