import type { CustomChoice } from "./CustomChoice";
import type { Story } from "./Story";

export class CustomStory {
    Id: number = 0;
    Choices: CustomChoice[][] = [];
    Initialize(story: Story): CustomStory {
        this.Id = story.Id
        return this
    }
}