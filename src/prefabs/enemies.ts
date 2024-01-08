import { Physics, Scene, Time } from 'phaser';
import { GameScene } from '../scenes/game.scene';
import { Enemy } from './enemy';
import { Projectiles } from './projectiles';

export class Enemies extends Physics.Arcade.Group {
  scene: GameScene;
  countMax = 15;
  countCreated = 0;
  countKilled = 0;
  timer: Time.TimerEvent;
  projectiles: Projectiles;

  constructor(scene: GameScene) {
    super(scene.physics.world, scene);
    this.scene = scene;
    this.projectiles = new Projectiles(this.scene);
    this.timer = this.scene.time.addEvent({
      delay: 1000,
      callback: this.spawnEnemy,
      callbackScope: this,
      loop: true
    })
  } 

  createEnemy() {
    let enemy: Enemy;
    enemy = this.getFirstDead();

    if (!enemy) {
      enemy = Enemy.generate(this.scene, this.projectiles);
      enemy.on(
        'killed',
        this.onEnemyKilled,
        this
      )
      this.add(enemy);
    } else {
      enemy.reset();
    }
    enemy.move();
  }

  onEnemyKilled() {
    this.countKilled += 1;
    this.scene.events.emit('enemy-killed');
    if(this.countKilled >= this.countMax) {
      this.scene.events.emit('enemies-killed');
    }
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