import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import { createApp, defineComponent, type PropType } from "vue";
import App from "./App.vue";
import type { Story } from "./interfaces/Story";
import type { Choice } from "./interfaces/Choice";

const app = createApp(App);
app.config.globalProperties.Events = {
    103301: [
        {
            Id: 1,
            Name: "Test",
            TriggerName: "TN",
            Choices: [{ Option: "opt", SuccessEffect: "SE", FailedEffect: "FE" }]
        }
    ]
};
app.provide('Events', app.config.globalProperties.Events)
app.mount("#app");

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        Events: { [cardId: number]: Story[]; };
    }
}