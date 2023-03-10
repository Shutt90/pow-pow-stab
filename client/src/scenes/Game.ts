import Phaser from 'phaser';
import PlayableSprite from '../sprites/PlayableSprite';
import heroJSON from '../sprites/assets/totem-idle.json'
import heroPNG from '../sprites/assets/totem-idle.png'

import EnemySprite from '../sprites/EnemySprite';
import tilesPNG from '../../assets/TX-Tileset-Grass.png'
import tilesJSON from '../../assets/arenamap.json'

import { GameText } from '../ui/Text';
import EnemyManager from '../sprites/EnemyManager';

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

  constructor() {
    super('Game');
  }

  preload() {
    this.load.aseprite('hero', heroPNG, heroJSON)
    this.load.image('base_tiles', tilesPNG)
    this.load.tilemapTiledJSON('tilemap', tilesJSON)
  }

  create() {
    this.add.image(0, 0, 'base_tiles')
    const map = this.make.tilemap({key: 'arena'})
    const tileset = map.addTilesetImage('arena', 'base_tiles')
    map.createLayer('ground', tileset)
    map.createLayer('walls', tileset)
    const enemies = new EnemyManager()

    this.anims.createFromAseprite('hero', ['idle'])
    this.hero = new PlayableSprite(this, 100 , 100, 'hero')

    setInterval(() => {
      const enemy = new EnemySprite(
        this,
        Phaser.Math.Between(0, this.sys.game.canvas.width),
        Phaser.Math.Between(0, this.sys.game.canvas.height),
        'enemy',
        this.hero?.level
      )
      enemies.addEnemy(enemy)
    }, 1000)

    this.physics.add.collider(this.hero, this.enemy, () => {
      this.hero?.takeDamage(this.enemy?.attributes.attack);
    })

    this.hero.setCollideWorldBounds()
    this.keys = this.input.keyboard.addKeys('A, W, S, D, left, right, up, down')

    this.createTextbox(0, 0, 'hello world')
    let expectedName: Array<string> = []
    const inputText = this.acceptText(expectedName);
    console.log(inputText)
  }

  update() {
    if (this.hero) {
      this.giveControlsX(this.hero)
      this.giveControlsY(this.hero)
    }
    if (!this.hero?.moving){
      this.hero?.play('idle', true)
    }

    if (this.input.keyboard.checkDown(this.keys.space)) {
      const dmg = this.hero.attack()

    }
  }

  giveControlsX(sprite: PlayableSprite) {
    if (this.input.keyboard.checkDown(this.keys.right) || this.input.keyboard.checkDown(this.keys.D)) {
      if (sprite.body.velocity.x < sprite.attributes.speed * 250) {
        sprite.moving = true;
        return sprite.body.setAccelerationX(sprite.attributes.speed * 175)
      } else {
        sprite.moving = true;
        return sprite.body.setVelocityX(sprite.attributes.speed * 250)
      }
    }

    if (this.input.keyboard.checkDown(this.keys.left) || this.input.keyboard.checkDown(this.keys.A)) {
      if (sprite.body.velocity.x > sprite.attributes.speed * -250) {
        sprite.moving = true;
        return sprite.body.setAccelerationX(sprite.attributes.speed * -175)
      } else {
        sprite.moving = true;
        return sprite.body.setVelocityX(sprite.attributes.speed * -250)
      }
    }
    sprite.moving = false;
    sprite.body.setVelocityX(0)
    sprite.body.setAccelerationX(0)

    if (!this.hero?.moving){
      this.hero?.play('idle', true)
    }
  }

  giveControlsY(sprite: PlayableSprite) {
    if (this.input.keyboard.checkDown(this.keys.up) || this.input.keyboard.checkDown(this.keys.W)) {
      if (sprite.body.velocity.y > sprite.attributes.speed * -250) {
        return sprite.body.setAccelerationY(sprite.attributes.speed * -175)
      } else {
        return sprite.body.setVelocityY(sprite.attributes.speed * -250)
      }
    }

    if (this.input.keyboard.checkDown(this.keys.down) || this.input.keyboard.checkDown(this.keys.S)) {
      if (sprite.body.velocity.y < sprite.attributes.speed * 250) {
        return sprite.body.setAccelerationY(sprite.attributes.speed * 175)
      } else {
        return sprite.body.setVelocityY(sprite.attributes.speed * 250)
      }
    }

    sprite.body.setVelocityY(0)
    sprite.body.setAccelerationY(0)
  }

  createTextbox(x: number, y: number, text: string) {
    const txt = new GameText(this, x, y, text, {})
  }

  acceptText(returnedArray: Array<string>): string {
    this.input.keyboard.addListener('keydown', textReturned, {once: true})

    function textReturned(e: Event): string | Function {
      (e: Event) => {
        console.log('hi')
        if (e.key.match(/[a-zA-Z]*$/)) {
          returnedArray.push(e.key)
        }
        if (e.key === 'enter') {
          return returnedArray.join
        } else {
          this.acceptText(returnedArray)
        }
      }
    }
  }
}
