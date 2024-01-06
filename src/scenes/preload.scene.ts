import { Scene } from 'phaser';

export class PreloadScene extends Scene {

  constructor() {
    super('preload')
  }

  init() {
  }

  preload() {
  } 

  async create() {
    console.log('Hello Phaser')
  }
}