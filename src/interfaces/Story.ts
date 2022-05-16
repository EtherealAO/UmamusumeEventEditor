import type { Choice } from "./Choice"
export interface Story {
    Id: number
    Name: string
    TriggerName: string
    Choices: Choice[]
}