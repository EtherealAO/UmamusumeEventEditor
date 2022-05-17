import { CustomChoice } from "./CustomChoice";
import type { Story } from "./Story";

export class CustomStory {
    Id: number = 0;
    Choices: CustomChoice[] = [];
    Initialize(story: Story): CustomStory {
        this.Id = story.Id
        for (var i of story.Choices) {
            if (i.SuccessEffect != '')
                this.Choices.push(new CustomChoice(i.SuccessEffect))
            if (i.FailedEffect != '')
                this.Choices.push(new CustomChoice(i.FailedEffect))
        }
        return this
    }
}