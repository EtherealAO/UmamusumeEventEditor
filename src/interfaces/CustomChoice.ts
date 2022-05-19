export class CustomChoice {
    Option: string = "";
    SuccessEffect: string = "";
    FailedEffect: string = "";
    SelectIndex: number = 0;
    Scenario: number = 0;
    State: number = 2147483647;
    Effect: string = "";
    Effects: string[] = [];
    constructor(effect: string) {
        this.Effect = effect
    }
    static Create(option: string, se: string, fe: string): CustomChoice {
        var instance = new CustomChoice("");
        instance.Option = option;
        instance.SuccessEffect = se;
        instance.FailedEffect = fe;

        var haveSuccessEffect = se != ''
        var haveFailedEffect = fe != ''
        if (haveSuccessEffect && haveFailedEffect)
            instance.Effects.push(`成功时: ${se}`);
        else if (haveSuccessEffect)
            instance.Effects.push(`${se}`);
        if (haveFailedEffect)
            instance.Effects.push(`失败时: ${fe}`);
        return instance;
    }
    Apply(choice: CustomChoice) {
        this.Option = choice.Option;
        this.SuccessEffect = choice.SuccessEffect;
        this.FailedEffect = choice.FailedEffect;

        if (this.SuccessEffect != '')
            this.Effects.push(`成功时: ${this.SuccessEffect}`)
        if (this.FailedEffect != '')
            this.Effects.push(`失败时: ${this.FailedEffect}`)
    }
}