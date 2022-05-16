export class Choice {
    Option: string;
    SuccessEffect: string;
    FailedEffect: string;
    constructor() {
        this.Option = "";
        this.SuccessEffect = "";
        this.FailedEffect = ""
    }
    Apply(choice: Choice) {
        this.Option = choice.Option;
        this.SuccessEffect = choice.SuccessEffect;
        this.FailedEffect = choice.FailedEffect;
    }
}