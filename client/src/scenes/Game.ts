import Phaser, { Tilemaps } from 'phaser';
import PlayableSprite from '../sprites/PlayableSprite';
import heroJSON from '../sprites/assets/totem-idle.json'
import heroPNG from '../sprites/assets/totem-idle.png'

import EnemySprite from '../sprites/EnemySprite';
import tilesPNG from '../../assets/TX-Tileset-Grass.png'
import tilesJSON from '../../assets/arenamap.json'

import { TextBox } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
import { GameText } from '../ui/Text';


export type Stats = {
  hp: Stat
  mana: Stat
  attack: Stat
  defense: Stat
  speed: Stat
}

export type Stat = number

export default class Game extends Phaser.Scene {
  hero: PlayableSprite | undefined;
  enemy: EnemySprite | undefined;
  keys: any
  canvas: HTMLCanvasElement | undefined;

  constructor() {
    super('Game');
  }

  preload() {
    this.canvas = this.sys.game.canvas;
    this.load.aseprite('hero', heroPNG, heroJSON)
    this.load.image('base_tiles', tilesPNG)
    this.load.tilemapTiledJSON('tilemap', tilesJSON)

  }

  create() {
    let { width, height } = this.sys.game.canvas;
    this.add.image(0, 0, 'base_tiles')
    const map = this.make.tilemap({key: 'arena'})
    const tileset = map.addTilesetImage('arena', 'base_tiles')
    map.createLayer('ground', tileset)
    map.createLayer('walls', tileset)
    this.hero = new PlayableSprite(this, 100 , 100, 'hero');
    this.enemy = new EnemySprite(this, 0, 0, 'enemy', this.hero.level);

    this.keys = this.input.keyboard.addKeys('A, W, S, D, left, right, up, down')

    this.createTextbox(0, 0, 'hello world')
  }

  update() {
    if (this.hero) {
      this.giveControlsX(this.hero)
      this.giveControlsY(this.hero)

    }
  }

  giveControlsX(sprite: PlayableSprite) {
    if (this.input.keyboard.checkDown(this.keys.right) || this.input.keyboard.checkDown(this.keys.D)) {
      sprite.body.setVelocityX(sprite.attributes.speed * 75)
      return
    }

    if (this.input.keyboard.checkDown(this.keys.left) || this.input.keyboard.checkDown(this.keys.A)) {
      sprite.body.setVelocityX(sprite.attributes.speed * -75)
      return
    }

    sprite.body.setVelocityX(0)
  }
  giveControlsY(sprite: PlayableSprite) {
    if (this.input.keyboard.checkDown(this.keys.up) || this.input.keyboard.checkDown(this.keys.W)) {
      sprite.body.setVelocityY(sprite.attributes.speed * -75)
      return
    }

    if (this.input.keyboard.checkDown(this.keys.down) || this.input.keyboard.checkDown(this.keys.S)) {
      sprite.body.setVelocityY(sprite.attributes.speed * 75)
      return
    }

    sprite.body.setVelocityY(0)
  }

  createTextbox(x: number, y: number, text: string) {
    const txt = new GameText(this, x, y, text, {})
    const textBox = new TextBox(this, {
      x: this.canvas.width,
      y: this.canvas.height,
      text: txt
    });
    scene.add.existing(textBox);

  }
}
