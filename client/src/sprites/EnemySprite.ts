import Phaser, { Scene } from 'phaser';
import { Stats } from '../scenes/Game';

const enemyTypes: Array<enemy> = [
    'flying',
    'ground',
    'swimming'
]

type enemy = string

export default class PlayableSprite extends Phaser.GameObjects.Sprite {
    attributes: Stats = {
        level: 1,
        hp: 25,
        mana: 10,
        attack: 1,
        defense: 1,
        speed: 1
    }

    private enemyType: enemy

    constructor(scene: Scene, x: number, y: number, texture: string, playerLevel: number){
        super(scene, x, y, texture)
        this.attributes.level = Phaser.Math.Between(playerLevel--,  playerLevel++)
        this.enemyType = this.typeGenerate(Phaser.Math.Between(0, enemyTypes.length--))
    }

    typeGenerate(type: number): string {
        return generateStats(this.enemyType)
    }

    generateStats(enemyType: enemy): enemyStats {
        return
    }

}