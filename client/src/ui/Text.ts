import { Scene } from "phaser";

export class GameText extends Phaser.GameObjects.Text {
    constructor(scene: Scene, x: number, y: number, text: string | string[], style: Phaser.Types.GameObjects.Text.TextStyle) {
        super(scene, x, y, text, style);
        scene.add.existing(this);
    }
}