import Phaser from 'phaser'
import { Stats, Stat } from '../scenes/Game';

export default class PlayableSprite extends Phaser.GameObjects.Sprite {
    attributes: Stats = {
        hp: 25,
        mana: 10,
        attack: 1,
        defense: 1,
        speed: 1
    }
    level: Stat = 1
    xp: Stat = 0

    //TODO: change any type
    setName(name: string): any {
        this.name = name
    }

    levelUp() {
        // @ts-ignore
        this.level++
        this.increaseStats()
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
                continue
            }
        }
    }
}

