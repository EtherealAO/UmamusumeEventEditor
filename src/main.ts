import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import { createApp } from "vue";
import App from "./App.vue";
import { Story } from "./interfaces/Story";
import { Choice } from "./interfaces/Choice";

const app = createApp(App);
app.config.globalProperties.Events = {
    103301: [
        Story.Create(1, "雲の向こう、宙のかなた", "アドマイヤベガ", [
            Choice.Create("力になれたみたいだね", "パワー(力量)+10、スキルpt+ 15", ""),
            Choice.Create("観測のコツを伝えてあげたら？", "『仕掛け抜群』のヒントLv+1", "")
        ]),
        Story.Create(2, "アヤベさんのサンドウィッチ", "アドマイヤベガ", [
            Choice.Create("無難な具材を勧める", "「直線巧者」のヒントLv+2", ""),
            Choice.Create("珍品（肉）を勧めてみる！", "やる気+1、パワー+15、「直線一気」のヒントLv+2", "やる気−1、パワー+10"),
            Choice.Create("珍品（魚）を勧めてみる！", "やる気+1、賢さ+15、「中距離直線◯」のヒントLv+2", "やる気−1、賢さ+10"),
            Choice.Create("珍品（野菜）を勧めてみる！", "やる気+1、スピード+15、「隠れ蓑」のヒントLv+2", "やる気−1、スピード+10")
        ])
    ]
};
app.provide('Events', app.config.globalProperties.Events)
app.mount("#app");

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        Events: { [cardId: number]: Story[]; };
    }
}