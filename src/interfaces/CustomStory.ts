import type { CustomChoice } from "./CustomChoice";

export class CustomStory {
    Id: number = 0;
    Name: string = "";
    TriggerName: string = "";
    Choices: CustomChoice[][] = [];
    static Create(id: number, name: string, triggerName: string, choices: CustomChoice[][]) {
        var instance = new CustomStory();
        instance.Id = id;
        instance.Name = name;
        instance.TriggerName = triggerName;
        instance.Choices = choices;
        return instance;
    }
    Apply(story: CustomStory): CustomStory {
        this.Id = story.Id;
        this.Name = story.Name;
        this.TriggerName = story.TriggerName;
        this.Choices = story.Choices;
        return this;
    }
    Initialize(story: CustomStory, customized?: CustomStory): CustomStory {
        this.Id = story.Id
        if (customized != null) {
            this.Choices = customized.Choices
        }
        return this
    }
}