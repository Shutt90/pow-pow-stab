import Phaser, { Tilemaps } from 'phaser';
import PlayableSprite from '../sprites/PlayableSprite';
import heroJSON from '../sprites/assets/totem-idle.json'
import heroPNG from '../sprites/assets/totem-idle.png'

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
    this.load.aseprite('hero', heroPNG, heroJSON)
    this.load.image('base_tiles', tilesPNG)
    this.load.tilemapTiledJSON('tilemap', tilesJSON)
  }

  create() {
    this.hero = new PlayableSprite(this, 100 , 100, 'hero');
    this.enemy = new EnemySprite(this, 0, 0, 'enemy', this.hero.level);
    this.add.image(0, 0, 'base_tiles')
    const map = this.make.tilemap({key: 'arena'})
    const tileset = map.addTilesetImage('arena', 'base_tiles')
    map.createLayer('ground', tileset)
    map.createLayer('walls', tileset)

  }

  update() {
    if (this.hero) {
      this.giveControls(this.hero)
    }
  }

  giveControls(sprite: PlayableSprite) {
    const keys = this.input.keyboard.addKeys('A, W, S, D, left, right, up, down')

    if (this.input.keyboard.checkDown(keys.up) || this.input.keyboard.checkDown(keys.W)) {
      sprite.body.setVelocityY(sprite.attributes.speed * 0.75)
    }

    if (this.input.keyboard.checkDown(keys.down) || this.input.keyboard.checkDown(keys.S)) {
      sprite.body.setVelocityY(sprite.attributes.speed * -0.75)
    }

    if (this.input.keyboard.checkDown(keys.right) || this.input.keyboard.checkDown(keys.D)) {
      sprite.body.setVelocityX(sprite.attributes.speed * 0.75)
    }

    if (this.input.keyboard.checkDown(keys.left) || this.input.keyboard.checkDown(keys.A)) {
      sprite.body.setVelocityX(sprite.attributes.speed * -0.75)
    }

  }
}
