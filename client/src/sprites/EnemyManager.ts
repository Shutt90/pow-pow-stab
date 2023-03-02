import EnemySprite from "./EnemySprite";

export default class EnemyManager {
    private enemies: Array<EnemySprite> = new Array<EnemySprite>()

    addEnemy(enemy: EnemySprite): void {
        this.enemies.push(enemy);
    }

    removeEnemy(enemy: EnemySprite): void {
        enemy.destroy();
        this.enemies.slice(this.enemies.indexOf(enemy, 0), this.enemies.indexOf(enemy, 0))
    }
}