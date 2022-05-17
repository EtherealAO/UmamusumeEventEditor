export class CustomChoice {
    SelectIndex: number = 0;
    Scenario: number = 0;
    State: number = 0;
    Effect: string = "";
    constructor(effect: string) {
        this.Effect = effect
    }
}