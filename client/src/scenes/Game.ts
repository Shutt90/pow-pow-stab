import Phaser, { Tilemaps } from 'phaser';
import PlayableSprite from '../sprites/PlayableSprite';
import hero from '../sprites/assets/Idle.png'
import EnemySprite from '../sprites/EnemySprite';
import tilesPNG from '../../assets/TX-Tileset-Grass.png'
import tilesJSON from '../../assets/arenamap.json'

export type Stats = {
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
    super('Game');
  }

  preload() {
    this.load.spritesheet('hero', hero, {frameWidth: 32, frameHeight: 32})
    this.load.image('base_tiles', tilesPNG)
    this.load.tilemapTiledJSON('tilemap', tilesJSON)
  }

  create() {
    this.hero = new PlayableSprite(this, 0 , 0, 'hero');
    this.enemy = new EnemySprite(this, 0, 0, 'enemy', this.hero.level);
    this.add.image(0, 0, 'base_tiles')
    const map = this.make.tilemap({key: 'arena'})
    const tileset = map.addTilesetImage('arena', 'base_tiles')
    map.createLayer('ground', tileset)
    map.createLayer('walls', tileset)
    this.hero.increaseStats()

  }

  update() {

  }
}
