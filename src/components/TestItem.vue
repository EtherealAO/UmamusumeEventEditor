<script setup lang="ts">
import { inject, reactive, ref, shallowReactive, watch } from "vue";
import { Base64 } from 'js-base64';
import SelectCard from "./SelectCard.vue";
import EventList from "./EventList.vue";
import Choice from "./Choice.vue";
import Toast from "./Toast.vue";
import { CustomStory } from "@/interfaces/CustomStory";
import { ShowToast } from "@/main";
import { CustomChoice } from "@/interfaces/CustomChoice";

const menus = reactive({
    menus: [
        {
            label: "保存",
            tip: "到地址栏里",
            click: () => {
                window.open(`/#${Base64.encodeURI(JSON.stringify(editedStory))}`, '_self')
            }
        },
        {
            label: "保存",
            tip: "到localStorage里",
            click: () => {
                if (editedStory.Id == 0) {
                    ShowToast(Toast, '请先选择事件')
                    return;
                }
                saveToLocalStorage()
            }
        },
        {
            label: "显示已保存的事件",
            tip: "只显示localStorage里的",
            click: () => {
                window.open(`/#${Base64.encodeURI(JSON.stringify(editedStory))}`, '_self')
            }
        }
    ]
})
const selectedEvent = shallowReactive(new CustomStory())
const selectedCard = ref(103301)
const supportEvents: { [cardId: number]: CustomStory[]; } = inject('supportEvents')!
const characterEvents: { [cardId: number]: CustomStory[]; } = inject('characterEvents')!
const customEvents: { [eventId: number]: CustomStory } = inject('customEvents')!
const isSupport = false;
const allEvents = isSupport ? supportEvents : characterEvents;
const events: CustomStory[] = shallowReactive(allEvents[selectedCard.value].concat(allEvents[Number.parseInt(selectedCard.value.toString().substring(0, 4))]))
var editedStory = new CustomStory().Initialize(selectedEvent, customEvents[selectedEvent.Id]);
var editedChoice: { [index: string]: CustomChoice }[] = []
var editedIndex = ref<number>(0)
var editedSelectIndex = ref<number>(0)
var editedState = ref<number>()
var editedEffect = ref<string>()
var editedScenario = ref<number>()
watch(editedEffect, () => {
    if (editedScenario.value == undefined || editedEffect.value == undefined) return;
    var index = editedEffect.value + editedScenario.value.toString()
    if (editedChoice[editedIndex.value] == undefined)
        editedChoice[editedIndex.value] = {}
    var choice = editedChoice[editedIndex.value][index]
    if (choice == undefined) {
        choice = new CustomChoice(editedEffect.value)
        choice.SelectIndex = editedSelectIndex.value
        choice.Scenario = editedScenario.value
        if (editedState.value != undefined)
            choice.State = editedState.value
    } else {
        choice.Effect = editedEffect.value
        choice.SelectIndex = editedSelectIndex.value
        choice.Scenario = editedScenario.value
        if (editedState.value != undefined)
            choice.State = editedState.value
    }
    editedChoice[editedIndex.value][index] = choice
})
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
function onEventSelected(selected: CustomStory) {
    saveToLocalStorage()
    selectedEvent.Apply(selected)
    editedStory = new CustomStory().Initialize(selectedEvent, customEvents[selectedEvent.Id])
    editedChoice = []
    editedIndex.value = 0
    editedSelectIndex.value = 0
    editedState.value = undefined
    editedEffect.value = undefined
    editedScenario.value = undefined
}
function saveToLocalStorage() {
    if (editedStory.Id == 0) return
    editedStory.Choices = []
    for (var i in editedChoice) {
        for (var j in editedChoice[i]) {
            if (editedStory.Choices[i] == undefined) editedStory.Choices[i] = []
            console.log(editedChoice[i][j])
            if (editedStory.Choices[i].indexOf(editedChoice[i][j]) == -1)
                editedStory.Choices[i].push(editedChoice[i][j])
        }
    }
    localStorage.setItem(editedStory.Id.toString(), JSON.stringify(editedStory))
}
</script>
 
<template>
    <div id="eventEditor" class="shadow p-3 mb-5 bg-body rounded vue3-menus-item" v-menus:right="menus">
        <div id="leftPart" class="shadow-sm container rounded">
            <SelectCard :cardId="selectedCard" v-model:card="selectedCard"
                @categoryChanged="(category) => onCategoryChanged(category)" />
            <EventList :events="events" @eventSelected="(selected) => onEventSelected(selected)" />
        </div>
        <div id="rightPart" class="shadow-sm container rounded">
            <Choice v-if="selectedEvent.Id != 0" v-for="(choices, index) in selectedEvent.Choices"
                v-model:selectIndex="editedSelectIndex" v-model:state="editedState" v-model:effect="editedEffect"
                v-model:scenario="editedScenario" :choices="choices" :selectedEvent="selectedEvent"
                v-model:editedIndex="editedIndex" :editingIndex="index" :style="`margin-top:${index * 250}px;`" />
        </div>
    </div>
</template>

<style scoped>
div#eventEditor {
    /*margin: 10%;*/
    position: relative;
    height: fit-content !important;
    width: fit-content !important;
    overflow-x: hidden;
    overflow-y: auto;
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