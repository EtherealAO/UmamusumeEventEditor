import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);
app.config.globalProperties.test = "TEST~";
app.mount("#app");

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        test: string;
    }
}