export class CustomChoice {
    SelectIndex: number = 0;
    Scenario: number = 0;
    State: number = 2147483647;
    Effect: string = "";
    constructor(effect: string) {
        this.Effect = effect
    }
}