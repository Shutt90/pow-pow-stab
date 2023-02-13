import Phaser, { Scene } from 'phaser'

type heroStats = {
    level: stat
    attack: stat
    defense: stat
    hp: stat
    mana: stat
    speed: stat
}

type stat = number | null

export default class Hero extends Phaser.GameObjects.Sprite {
    level: stat = 1
    attack: stat = 1
    defence: stat = 1
    hp: stat = 25
    mana: stat = 10
    speed: stat = 1

    constructor(texture: Phaser.Textures.Texture, scene: Scene) {
        super(scene, 0, 0, texture, 0);
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

    //TODO: change any type
    setName(name: string): any {
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

    levelUp() {
        // @ts-ignore
        this.level++;
    }

    increaseStats(stats: heroStats) {
        for(const property of Object.values(stats)) {
            console.log(property)
        }
    }
}

