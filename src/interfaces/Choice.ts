export class Choice {
    Option: string = "";
    SuccessEffect: string = "";
    FailedEffect: string = "";
    Effects: string[] = [];
    static Create(option: string, se: string, fe: string): Choice {
        var instance = new Choice();
        instance.Option = option;
        instance.SuccessEffect = se;
        instance.FailedEffect = fe;

        if (se != '')
            instance.Effects.push(`成功时: ${se}`);
        if (fe != '')
            instance.Effects.push(`失败时: ${fe}`);
        return instance;
    }
    Apply(choice: Choice) {
        this.Option = choice.Option;
        this.SuccessEffect = choice.SuccessEffect;
        this.FailedEffect = choice.FailedEffect;

        if (this.SuccessEffect != '')
            this.Effects.push(`成功时: ${this.SuccessEffect}`)
        if (this.FailedEffect != '')
            this.Effects.push(`失败时: ${this.FailedEffect}`)
        console.log('?')
    }
}