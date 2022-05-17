<script setup lang="ts">
import { inject, reactive, ref, shallowReactive } from "vue";
import { Base64 } from 'js-base64';
import SelectCard from "./SelectCard.vue";
import EventList from "./EventList.vue";
import Choice from "./Choice.vue";
import { Story } from "@/interfaces/Story";
import { CustomStory } from "@/interfaces/CustomStory";

const selectedEvent = shallowReactive(new Story())
const selectedCard = ref(103301)
const supportEvents: { [cardId: number]: Story[]; } = inject('supportEvents')!
const characterEvents: { [cardId: number]: Story[]; } = inject('characterEvents')!
const isSupport = false;
const allEvents = isSupport ? supportEvents : characterEvents;
const events: Story[] = shallowReactive(allEvents[selectedCard.value].concat(allEvents[Number.parseInt(selectedCard.value.toString().substring(0, 4))]))
const menus = reactive({
    menus: [
        {
            label: "保存",
            tip: "到地址栏里",
            click: () => {
                window.open(`/#${Base64.encodeURI(JSON.stringify(editedStory))}`, '_self')
            }
        }
    ]
})

var editedStory = new CustomStory().Initialize(selectedEvent);

function onCardChanged(card: string) {
    selectedCard.value = Number.parseInt(card)
}
function onCategoryChanged(category: string) {
    events.length = 0
    switch (category) {
        case "all":
            events.push(...allEvents[selectedCard.value].concat(allEvents[Number.parseInt(selectedCard.value.toString().substring(0, 4))]))
            break;
        case "special":
            events.push(...allEvents[selectedCard.value])
            break;
        case "common":
            events.push(...allEvents[Number.parseInt(selectedCard.value.toString().substring(0, 4))])
            break;
        case "universal":
            break;
    }
}
function onSelectIndexChanged(index: number, selectIndex: string) {
    editedStory.Choices[index].SelectIndex = Number.parseInt(selectIndex)
}
function onStateChanged(index: number, state: string) {
    editedStory.Choices[index].State = Number.parseInt(state)
}
function onInputEffectChanged(index: number, inputEffect: string) {
    editedStory.Choices[index].Effect = inputEffect
}
function onScenarioChanged(index: number, scenario: string) {
    editedStory.Choices[index].Scenario = Number.parseInt(scenario)
}
function onEventSelected(selected: Story) {
    selectedEvent.Apply(selected)
    editedStory.Initialize(selectedEvent)
}
</script>
 
<template>
    <div id="eventEditor" class="shadow p-3 mb-5 bg-body rounded vue3-menus-item" v-menus:right="menus">
        <div id="leftPart" class="shadow-sm container rounded">
            <SelectCard :cardId="selectedCard" @cardChanged="(cardId) => onCardChanged(cardId)"
                @categoryChanged="(category) => onCategoryChanged(category)" />
            <EventList :events="events" @eventSelected="(selected) => onEventSelected(selected)" />
        </div>
        <div id="rightPart" class="shadow-sm container rounded">
            <Choice v-if="selectedEvent.Id != 0" v-for="(choice, index) in selectedEvent.Choices"
                @selectIndexChanged="(selectIndex) => onSelectIndexChanged(index, selectIndex)"
                @stateChanged="(state) => onStateChanged(index, state)"
                @inputEffectChanged="(inputEffect) => onInputEffectChanged(index, inputEffect)"
                @scenarioChanged="(scenario) => onScenarioChanged(index, scenario)" :choice="choice"
                :selectedEvent="selectedEvent" :style="`margin-top:${index * 250}px;`" />
        </div>
    </div>
</template>

<style scoped>
div#eventEditor {
    /*margin: 10%;*/
    height: fit-content !important;
    width: fit-content !important;
    overflow: auto;
}

div#leftPart {
    /*background-color: pink;*/
    margin-right: 10px;
    width: min-content;
    float: left;
}

div#rightPart {
    /*background-color: blanchedalmond;*/
    display: table-row;
}
</style>