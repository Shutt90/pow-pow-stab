import Phaser, { Scene } from 'phaser';

type enemyStats = {
    level: stat
    attack: stat
    defense: stat
    hp: stat
    mana: stat
    speed: stat
}

const enemyTypes: Array<enemy> = [
    'flying',
    'ground',
    'swimming'
]

type enemy = string

type stat = number | null

export default class PlayableSprite extends Phaser.GameObjects.Sprite {
    level: stat
    attack: stat
    defence: stat
    hp: stat
    mana: stat
    speed: stat
    enemyType: enemy

    constructor(scene: Scene, x: number, y: number, texture: string, playerLevel: number){
        super(scene, x, y, texture)
        this.level = Phaser.Math.Between(playerLevel--,  playerLevel++)
        this.enemyType = this.typeGenerate(Phaser.Math.Between(0, enemyTypes.length--))
    }

    typeGenerate(type: number): string {
        return generateStats(this.enemyType)
    }

    generateStats(enemyType: enemy): enemyStats {
        return
    }

}