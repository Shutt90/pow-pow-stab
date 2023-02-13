import Phaser from 'phaser';
import PlayableSprite from '../sprites/PlayableSprite';
import hero from '../sprites/assets/Idle.png'
import EnemySprite from '../sprites/EnemySprite';

export type Stats = {
  level: Stat
  hp: Stat
  mana: Stat
  attack: Stat
  defense: Stat
  speed: Stat
}

export type Stat = number | null

export default class Game extends Phaser.Scene {
  hero: PlayableSprite | undefined;
  enemy: EnemySprite | undefined;

  constructor() {
    super('GameScene');
  }

  preload() {
    this.load.spritesheet('hero', hero, {frameWidth: 32, frameHeight: 32})
  }

  create() {
    this.hero = new PlayableSprite(this, 0 , 0, 'hero');
    this.enemy = new EnemySprite(this, 0, 0, 'enemy');
  }

  update() {

  }
}
