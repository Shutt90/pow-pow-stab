import Phaser, { Scene, Textures } from 'phaser'
import { Stats, Stat } from './scenes/Game';
import { MAX_LIVES } from '../constants'

type life = boolean;

export default class PlayableSprite extends Phaser.Physics.Arcade.Sprite {
    attributes: Stats = {
        maxHp: 25,
        currentHp: 25,
        maxMana: 10,
        currentMana: 10,
        attack: 1,
        defense: 1,
        speed: 1
    }
    lives: integer = MAX_LIVES
    level: Stat = 1
    xp: Stat = 0
    moving: boolean = false
    isDead: boolean = false

    constructor(scene: Scene, x: number, y: number, texture: string | Textures.Texture, frame?: string) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        scene.physics.add.existing(this)
        scene.physics.world.setBoundsCollision()
        this.setCollideWorldBounds()
    }

    //TODO: change any type
    // @ts-ignore
    setName(name: string): void {
        this.name = name
    }

    levelUp() {
        this.level++
        this.increaseStats()
    }

    takeDamage(damage: Stat) {
        this.attributes.hp - damage;
        if (this.attributes.currentHp < 1) {
            this.isDead = true
        }
    }

    increaseStats() {
        for(let attr in this.attributes) {
            if (attr !== null) {
                if (attr === 'hp') {
                    this.attributes[attr] = this.attributes[attr] + 5
                    continue
                }
                if (attr === 'mana') {
                    this.attributes[attr] = this.attributes[attr] + 2
                    continue
                }

                this.attributes[attr] = this.attributes[attr] + 1
            }
        }
    }
    
    attack(): Stat {
        // play animation, while animation is playing do damage, otherwise take damage on collision
        return this.attributes.attack
    }
}