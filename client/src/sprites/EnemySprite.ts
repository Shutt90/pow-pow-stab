import Phaser, { Scene } from 'phaser';
import { Stats, Stat } from '../scenes/Game';

const enemyTypes: Array<enemy> = [
    'flying',
    'ground',
    'swimming'
]

type enemy = string

export default class EnemySprite extends Phaser.Physics.Arcade.Sprite {
    attributes: Stats = {
        hp: 25,
        mana: 10,
        attack: 1,
        defense: 1,
        speed: 1
    }
    level: Stat = 1

    private enemyType: enemy

    constructor(scene: Scene, x: number, y: number, texture: string, playerLevel: number){
        super(scene, x, y, texture)
        scene.add.existing(this)
        scene.physics.add.existing(this)
        scene.physics.world.setBoundsCollision()
        this.enemyType = enemyTypes[Phaser.Math.Between(0, enemyTypes.length-1)]
        this.statsForEnemyType()
        this.setCollideWorldBounds()
    }

    statsForEnemyType(): void {
        //TODO: refactor later
        if (this.enemyType === enemyTypes[0]) {
            //flying enemy
            this.generateStats(0.35, 0.45)
        }

        if (this.enemyType === enemyTypes[1]) {
            //grounded enemy
            this.generateStats(0.45, 0.48)

        }

        if (this.enemyType === enemyTypes[2]) {
            //swimming enemy
            this.generateStats(0.35, 0.43)

        }
    }

    generateStats(min: number, max: number) {
        for(const attr of Object.values(this.attributes)) {
            if(attr as Stat !== null) {
                this.attributes[attr] = this.level === null ? '' : this.level * Phaser.Math.Between(min, max)
            }
        }
    }
}