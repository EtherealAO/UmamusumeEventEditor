import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import { createApp } from "vue";
import Menus from 'vue3-menus';
import App from "./App.vue";
import { CustomStory } from "./interfaces/CustomStory";
import { CustomChoice } from "./interfaces/CustomChoice";

(async () => {
    var res = await fetch("/data/deserialized/editorevents.json")
    var json = await res.json()
    var supportEvents: { [cardId: number]: CustomStory[]; } = [];
    for (var i in json.Supports) {
        var index = Number.parseInt(i)
        var events = json.Supports[i];
        for (var event of events) {
            var choices: CustomChoice[][] = [];
            for (var choiceIndex in event.Choices) {
                for (var choice of event.Choices[choiceIndex]) {
                    if (choices[Number.parseInt(choiceIndex)] == undefined) choices[Number.parseInt(choiceIndex)] = []
                    choices[Number.parseInt(choiceIndex)].push(CustomChoice.Create(choice.Option, choice.SuccessEffect, choice.FailedEffect))
                }
            }
            if (supportEvents[index] == null)
                supportEvents[index] = []
            supportEvents[index].push(CustomStory.Create(event.Id, event.Name, event.TriggerName, choices))
        }
    }
    var characterEvents: { [cardId: number]: CustomStory[]; } = [];
    for (var i in json.Characters) {
        var index = Number.parseInt(i)
        var events = json.Characters[i];
        for (var event of events) {
            var choices: CustomChoice[][] = [];
            for (var choiceIndex in event.Choices) {
                for (var choice of event.Choices[choiceIndex]) {
                    if (choices[Number.parseInt(choiceIndex)] == undefined) choices[Number.parseInt(choiceIndex)] = []
                    choices[Number.parseInt(choiceIndex)].push(CustomChoice.Create(choice.Option, choice.SuccessEffect, choice.FailedEffect))
                }
            }
            if (characterEvents[index] == null)
                characterEvents[index] = []
            characterEvents[index].push(CustomStory.Create(event.Id, event.Name, event.TriggerName, choices))
        }
    }
    var customEvents: { [eventId: number]: CustomStory } = {};
    for (var customEventId in localStorage) {
        var customEventJSON = localStorage.getItem(customEventId)
        if (customEventJSON == null) continue;
        customEvents[Number.parseInt(customEventId)] = Object.assign(new CustomStory(), JSON.parse(customEventJSON))
    }

    const app = createApp(App);
    app.config.globalProperties.supportEvents = supportEvents;
    app.provide('supportEvents', app.config.globalProperties.supportEvents)
    app.config.globalProperties.characterEvents = characterEvents;
    app.provide('characterEvents', app.config.globalProperties.characterEvents)
    app.config.globalProperties.customEvents = customEvents;
    app.provide('customEvents', app.config.globalProperties.customEvents)

    app.use(Menus);
    app.mount("#app");
})()

export function ShowToast(toast: any, content: string) {
    var wrapper = document.createElement("div")
    createApp(toast, {
        content: content
    }).mount(wrapper)
    var editor = document.getElementById("eventEditor")
    editor!.appendChild(wrapper)
    setTimeout(() => {
        editor!.removeChild(wrapper)
    }, 5000)
}
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        supportEvents: { [cardId: number]: CustomStory[]; };
        characterEvents: { [cardId: number]: CustomStory[]; };
    }
}