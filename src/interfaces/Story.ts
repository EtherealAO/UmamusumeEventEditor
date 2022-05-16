import type { Choice } from "./Choice"
export class Story {
    Id: number = 0;
    Name: string = "";
    TriggerName: string = "";
    Choices: Choice[] = [];
    static Create(id: number, name: string, triggerName: string, choices: Choice[]): Story {
        var instance = new Story();
        instance.Id = id;
        instance.Name = name;
        instance.TriggerName = triggerName;
        instance.Choices = choices;
        return instance;
    }
    Apply(story: Story) {
        this.Id = story.Id;
        this.Name = story.Name;
        this.TriggerName = story.TriggerName;
        this.Choices = story.Choices;
    }
}