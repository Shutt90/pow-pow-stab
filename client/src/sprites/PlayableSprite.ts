import Phaser from 'phaser'
import { Stats } from '../scenes/Game';

type stat = number | null

export default class PlayableSprite extends Phaser.GameObjects.Sprite {
    attributes: Stats = {
        level: 1,
        hp: 25,
        mana: 10,
        attack: 1,
        defense: 1,
        speed: 1
    }

    //TODO: change any type
    setName(name: string): any {
        this.name = name
    }

    levelUp() {
        // @ts-ignore
        this.attributes.level++
    }

    increaseStats(stats: heroStats) {
    }
}

