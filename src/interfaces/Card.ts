export class Card {
    Id: number = 0;
    Rarity: number = 0;
    RaceDressId: number = 0;
    ProperDistance: { [distance: string]: number; } = {};
    ProperRunningStyle: { [runningStyle: string]: number; } = {};
    ProperGround: { [runningStyle: string]: number; } = {};
}