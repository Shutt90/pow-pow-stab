import { GameObjects } from "phaser";

export class PowerUp extends Phaser.GameObjects.GameObject {

    constructor(scene: Phaser.Scene, type: string) {
        super(scene, type)


    }

    once(event: string | symbol, fn: Function, context?: any): this {
        fn = () => {
            
        }
    }
}