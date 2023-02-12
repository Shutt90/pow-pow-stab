import Phaser from 'phaser';
import Hero from '../sprites/Hero';

export default class OpeningScene extends Phaser.Scene {
  hero = new Hero('champ');

  constructor() {
    super('GameScene');
  }

  preload() {
    this.load.image('logo', 'assets/phaser3-logo.png');
  }

  create() {
    this.input.keyboard.addKeys('W, A, S, D, SHIFT, SPACE')

  }

  update() {

  }

  controls() {

  }
}
