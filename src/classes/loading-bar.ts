import { GameObjects, Loader, Scenes } from 'phaser';
import { PreloadScene } from '../scenes/preload.scene';

export class LoadingBar {
  private style: any

  private progressBox: GameObjects.Graphics;
  private progressBar: GameObjects.Graphics;

  constructor(private scene: PreloadScene) {
    this.style = {
      boxColor: 0xD3D3D3,
      barColor: 0xFFF8DC,
      x: +this.scene.game.config.width / 2 - 450,
      y: +this.scene.game.config.height / 2 + 250,
      width: 900,
      height: 25,
    }

    this.progressBox = this.scene.add.graphics();
    this.progressBar = this.scene.add.graphics();

    this.showProgressBox();
    this.setEvents();
  }

  setEvents() {
    this.scene.load.on(Loader.Events.PROGRESS, this.showProgressBar, this);
    this.scene.load.on(Loader.Events.COMPLETE, this.onLoadComplete, this);
  }

  onLoadComplete() {
    this.progressBar.destroy();
    this.progressBox.destroy();
  }

  showProgressBox() {
    const { boxColor, x, y, width , height } = this.style;
    this.progressBox.fillStyle(boxColor).fillRect(x, y, width, height);
  }

  showProgressBar(value: number) {
    const { barColor, x, y, width , height } = this.style;
    this.progressBar.clear().fillStyle(barColor).fillRect(x, y, width * value, height);
  }
}