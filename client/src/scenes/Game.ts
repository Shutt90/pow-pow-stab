import Phaser from 'phaser';
import PlayableSprite from '../sprites/PlayableSprite';
import hero from '../sprites/assets/Idle.png'

export type Stats = {
  level: stat
  hp: stat
  mana: stat
  attack: stat
  defense: stat
  speed: stat
}

type stat = number | null

export default class Game extends Phaser.Scene {
  hero: PlayableSprite | undefined;
  constructor() {
    super('GameScene');
  }

  preload() {
    this.load.spritesheet('hero', hero, {frameWidth: 32, frameHeight: 32})
  }

  create() {
    this.hero = new PlayableSprite(this, 0 , 0, 'hero');
    this.load
    console.log(this.hero);
  }

  update() {

  }

  controls() {

  }
}
