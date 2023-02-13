import Phaser, { Textures } from 'phaser';
import Hero from '../sprites/Hero';
import idle from '../sprites/assets/Idle.png'


export default class OpeningScene extends Phaser.Scene {
  heroTexture: Textures.Texture
  hero: Hero

  constructor() {
    super('GameScene');
    console.log(this)
    this.heroTexture = new Textures.Texture(this.textures, 'hero', idle, 64, 64)
    this.hero = new Hero(this.heroTexture, this);
    this.load.
  }

  preload() {
    this.load.image('logo', 'assets/phaser3-logo.png');
    this.load.spritesheet('hero', '../sprites/assets/Idle.png', {frameWidth: 64, frameHeight: 64})

  }

  create() {
    this.input.keyboard.addKeys('W, A, S, D, SHIFT, SPACE')
    this.add.sprite(0,0,'hero')

  }

  update() {

  }

  controls() {

  }
}
