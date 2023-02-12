import Phaser from 'phaser'
import OpeningScene from '../scenes/Game'

type heroStats {
    level: stat
    attack: stat
    defense: stat
    hp: stat
    mana: stat
    speed: stat
}

type stat = number | null

export default class Hero extends Phaser.GameObjects.Sprite {
    name: string = 'Hero'
    level: stat = 1
    attack: stat = 1
    defence: stat = 1
    hp: stat = 25
    mana: stat = 10
    speed: stat = 1

    constructor(heroName: string) {
        super(OpeningScene, 0, 0, 'none', 0);
        this.name = heroName;
    }

    getStats(): heroStats {
        return {
            level: this.getAttribute('level'),
            attack: this.getAttribute('attack'),
            defense: this.getAttribute('defence'),
            hp: this.getAttribute('hp'),
            mana: this.getAttribute('mana'),
            speed: this.getAttribute('speed'),
        }
    }

    setName(name: string): void {
        this.name = name
    }

    getAttribute(attr: string): stat | null {
        switch(attr) {
            case 'level':
              return this.level
            case 'attack':
              return this.attack
            case 'defence':
                return this.defence
            case 'hp':
                return this.hp
            case 'mana':
                return this.mana
            case 'speed':
                return this.speed
            default: return null
        }
            
    }
}

