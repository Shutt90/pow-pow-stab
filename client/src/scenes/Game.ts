import Phaser, { Textures } from 'phaser';
import idle from '../sprites/assets/Idle.png'
import PlayableSprite from '../sprites/PlayableSprite';


export default class Game extends Phaser.Scene {
  heroTexture: Textures.Texture
  hero: PlayableSprite

  constructor() {
    super('GameScene');
    console.log(this)
    this.heroTexture = new Textures.Texture(this.textures, 'hero', idle, 64, 64)
    this.hero = new PlayableSprite(this, 0 , 0, this.textures, 0);
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
