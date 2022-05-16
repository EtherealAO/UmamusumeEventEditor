import { Choice } from "./Choice"
export class Story {
    Id: number
    Name: string
    TriggerName: string
    Choices: Choice[]
    constructor() {
        this.Id = 0;
        this.Name = "";
        this.TriggerName = "";
        this.Choices = [new Choice()]
    }
    Apply(story: Story) {
        this.Id = story.Id;
        this.Name = story.Name;
        this.TriggerName = story.TriggerName;
        this.Choices = story.Choices;
    }
}