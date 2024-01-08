import { GameObjects, Scene, Scenes, Tilemaps, Types } from 'phaser';
import { Player } from '../prefabs/player';
import { Enemy } from '../prefabs/enemy';
import { Enemies } from '../prefabs/enemies';
import { Projectile } from '../prefabs/projectile';
import { Boom } from '../prefabs/boom';

export class GameScene extends Scene {

  private bg!: GameObjects.TileSprite;

  private sounds: Record<string, Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound> = {};

  private player!: Player;
  private enemies!: Enemies;

  private countKilledEnemies!: number;
  private scoreText!: GameObjects.Text;

  private cursors!: Types.Input.Keyboard.CursorKeys;

  constructor() {
    super('game');
  }

  init() {
    this.cursors = this.input.keyboard!.createCursorKeys();
  }

  create() {
    this.createBackground();
    this.createSounds();
 
    this.player = new Player(this);
    this.enemies = new Enemies(this);

    this.countKilledEnemies = 0;
    this.createKilledEnemiesText();

    this.createEnemyKilledEvent();

    this.createCompleteEvents();

    this.addOverlap();
  }

  update() {
    this.player.move(this.cursors);

    //this.enemy.move();
    this.bg.tilePositionX += 0.5;
  }

  createSounds() {
    if(this.sounds.theme) return;
    
    this.sounds.boom = this.sound.add('boom', { volume: 0.1 });
    this.sounds.theme = this.sound.add('theme', { volume: 0.1, loop: true });

    this.playSound('theme');
  }

  playSound(
    soundKey: 'boom'| 'theme',
  ) {
    this.sounds[soundKey].play();
  }

  createKilledEnemiesText() {
    this.scoreText = this.add.text(
      50,
      50,
      `Score: ${this.countKilledEnemies}`,
      {
        font: '40px CurseCasual',
        color: '#000000',
      }
    ).setOrigin(0, 0);
  }

  createCompleteEvents() {
    this.player.once(
      'killed',
      this.onComplete,
      this
    );

    this.events.once(
      'enemies-killed',
      this.onComplete,
      this
    )
  }

  createEnemyKilledEvent() {
    this.events.on(
      'enemy-killed',
      () => {
        this.countKilledEnemies += 1;
        this.scoreText.setText(`Killed enemies: ${this.countKilledEnemies}`);
      },
      this
    );

    this.events.once(Scenes.Events.SHUTDOWN, () => {
      this.events.off(
        'enemy-killed'
      );
		});

  }

  onComplete() {
    let status = false;

    if (this.player.active) {
      status = true;
    } 

    this.scene.start('start', {
      score: this.countKilledEnemies,
      completed: status,
    });
  }

  createBackground() {
    this.bg = this.add.tileSprite(
      0,
      0,
      +this.game.config.width,
      +this.game.config.height,
      'bg'
    ).setOrigin(0, 0);
  }

  addOverlap() {
    this.physics.add.overlap(
      this.player.projectiles,
      this.enemies,
      this.onOverlapFireEnemy,
      undefined,
      this
    );

    this.physics.add.overlap(
      this.enemies.projectiles,
      this.player,
      this.onOverlap,
      undefined,
      this
    )

    this.physics.add.overlap(
      this.enemies,
      this.player,
      this.onOverlap,
      undefined,
      this
    )
  }

  onOverlapFireEnemy(
    source: Types.Physics.Arcade.GameObjectWithBody | Tilemaps.Tile, 
    target: Types.Physics.Arcade.GameObjectWithBody | Tilemaps.Tile
  ) {
    const fire = source as Projectile;
    const enemy = target as Enemy;
    console.log(fire, enemy)
    fire.setAlive(false);
    enemy.setAlive(false);
    Boom.generate(this, enemy.x, enemy.y)
    this.playSound('boom')
  }
  
  onOverlap(
    source: Types.Physics.Arcade.GameObjectWithBody | Tilemaps.Tile, 
    target: Types.Physics.Arcade.GameObjectWithBody | Tilemaps.Tile
  ) {
    const fire = source as Projectile;
    const enemy = target as Enemy;
    console.log(fire, enemy)
    fire.setAlive(false);
    enemy.setAlive(false);
  }
}