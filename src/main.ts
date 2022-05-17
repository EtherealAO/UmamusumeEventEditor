import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import { createApp } from "vue";
import Menus from 'vue3-menus';
import { Story } from "./interfaces/Story";
import { Choice } from "./interfaces/Choice";
import App from "./App.vue";

(async () => {
    var res = await fetch("https://assets.shuise.net/UmamusumeEventEditor/public/data/deserialized/editorevents.json")
    var json = await res.json()
    var supportEvents: { [cardId: number]: Story[]; } = [];
    for (var i in json.Supports) {
        var index = Number.parseInt(i)
        var events = json.Supports[i];
        for (var event of events) {
            var choices: Choice[] = [];
            for (var choice of event.Choices) {
                choices.push(Choice.Create(choice.Option, choice.SuccessEffect, choice.FailedEffect))
            }
            if (supportEvents[index] == null)
                supportEvents[index] = []
            supportEvents[index].push(Story.Create(event.Id, event.Name, event.TriggerName, choices))
        }
    }
    var characterEvents: { [cardId: number]: Story[]; } = [];
    for (var i in json.Characters) {
        var index = Number.parseInt(i)
        var events = json.Characters[i];
        for (var event of events) {
            var choices: Choice[] = [];
            for (var choice of event.Choices) {
                choices.push(Choice.Create(choice.Option, choice.SuccessEffect, choice.FailedEffect))
            }
            if (characterEvents[index] == null)
                characterEvents[index] = []
            characterEvents[index].push(Story.Create(event.Id, event.Name, event.TriggerName, choices))
        }
    }

    const app = createApp(App);
    app.config.globalProperties.supportEvents = supportEvents;
    app.provide('supportEvents', app.config.globalProperties.supportEvents)
    app.config.globalProperties.characterEvents = characterEvents;
    app.provide('characterEvents', app.config.globalProperties.characterEvents)

    app.use(Menus);
    app.mount("#app");
})()


declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        supportEvents: { [cardId: number]: Story[]; };
        characterEvents: { [cardId: number]: Story[]; };
    }
}