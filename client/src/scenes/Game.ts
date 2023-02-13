import Phaser from 'phaser';
import PlayableSprite from '../sprites/PlayableSprite';

export default class Game extends Phaser.Scene {
  hero: PlayableSprite | undefined;
  constructor() {
    super('GameScene');
  }

  preload() {
    this.load.image('logo', 'assets/phaser3-logo.png');
    this.load.spritesheet('hero', '../sprites/assets/Idle.png', {frameWidth: 64, frameHeight: 64})
  }

  create() {
    this.hero = new PlayableSprite(this, 0 , 0, 'hero');    
  }

  update() {

  }

  controls() {

  }
}
