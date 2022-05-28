<script setup lang="ts">
import { inject, isReactive, reactive, ref, shallowReactive, watch, watchPostEffect } from "vue";
import { Base64 } from 'js-base64';
import SelectCard from "./SelectCard.vue";
import EventList from "./EventList.vue";
import Choice from "./Choice.vue";
import Toast from "./Toast.vue";
import { CustomStory } from "@/interfaces/CustomStory";
import { ShowToast } from "@/main";
import { CustomChoice } from "@/interfaces/CustomChoice";
import { Card } from "@/interfaces/Card";
const supportEvents: { [cardId: number]: CustomStory[]; } = inject('supportEvents')!
const characterEvents: { [cardId: number]: CustomStory[]; } = inject('characterEvents')!
const menus = reactive({
    menus: [
        {
            label: "发布",
            tip: "还没做",
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

const selectedCard = ref(new Card())
const selectedEvent = shallowReactive(new CustomStory())
const isSupport = false;
const allEvents = isSupport ? supportEvents : characterEvents;

var events: CustomStory[] = shallowReactive([])
var editedStory = shallowReactive(new CustomStory());
var editedChoice: { [index: string]: CustomChoice }[] = reactive([])
var editedIndex = ref<number>(0)
var editedSelectIndex = ref<number>(1)
var editedState = ref<number>()
var editedEffect = ref<string>()
var editedScenario = ref<number>()
var selectedEffect = ref<string>("")
watch(selectedCard, () => {
    events.length = 0
    events.push(...allEvents[selectedCard.value.Id].concat(allEvents[Number.parseInt(selectedCard.value.Id.toString().substring(0, 4))]))
    selectedEvent.Apply(new CustomStory())
    editedStory.Apply(new CustomStory())
    editedChoice = []
    editedIndex.value = 0
    editedSelectIndex.value = 1
    editedState.value = undefined
    editedEffect.value = undefined
    editedScenario.value = undefined
})
watch(editedEffect, () => {
    if (editedScenario.value == undefined || editedEffect.value == undefined) return;
    var index = editedEffect.value + editedScenario.value.toString()
    if (editedChoice[editedIndex.value] == undefined)
        editedChoice[editedIndex.value] = {}
    var choice = editedChoice[editedIndex.value][index]
    if (choice == undefined) {
        choice = new CustomChoice(editedEffect.value)
    } else {
        choice.Effect = editedEffect.value
    }
    choice.SelectIndex = editedSelectIndex.value
    choice.Scenario = editedScenario.value
    choice.OriginalEffect = selectedEffect.value
    if (editedState.value != undefined)
        choice.State = editedState.value
    editedChoice[editedIndex.value][index] = choice
})
function onCategoryChanged(category: string) {
    events.length = 0
    if (selectedCard.value.Id == 0) return
    switch (category) {
        case "all":
            events.push(...allEvents[selectedCard.value.Id].concat(allEvents[Number.parseInt(selectedCard.value.Id.toString().substring(0, 4))]))
            break;
        case "special":
            events.push(...allEvents[selectedCard.value.Id])
            break;
        case "common":
            events.push(...allEvents[Number.parseInt(selectedCard.value.Id.toString().substring(0, 4))])
            break;
        case "universal":
            events.push(...allEvents[0].concat(allEvents[1]).concat(allEvents[2]).concat(allEvents[4]))
            break;
        case "system":
            events.push(...allEvents[0])
            break;
        case "ura":
            events.push(...allEvents[1])
            break;
        case "aoharu":
            events.push(...allEvents[2])
            break;
        case "climax":
            events.push(...allEvents[4])
            break;
    }
}
watch(selectedEvent, () => {
    saveToLocalStorage()
    editedStory.Apply(selectedEvent)
    editedChoice = []
    editedIndex.value = 0
    editedSelectIndex.value = 1
    editedState.value = undefined
    editedEffect.value = undefined
    editedScenario.value = undefined
});
function saveToLocalStorage() {
    if (editedStory.Id == 0) return
    //editedStory.Name = selectedEvent.Name
    //editedStory.TriggerName = selectedEvent.TriggerName
    var newerChoices: CustomChoice[][] = []
    for (var i in editedChoice) {
        for (var j in editedChoice[i]) {
            if (newerChoices[i] == undefined) newerChoices[i] = []
            if (newerChoices[i].indexOf(editedChoice[i][j]) == -1) {
                var effect = editedChoice[i][j].Effect
                if (effect != '' && selectedEvent.Choices[i].findIndex(x => x.Effect == effect) == -1) {
                    newerChoices[i].push(editedChoice[i][j])
                }
            }
        }
    }
    var previousAdded = localStorage.getItem(editedStory.Id.toString())
    if (previousAdded == null) {
        if (newerChoices.length > 0) {
            editedStory.Choices = newerChoices
            localStorage.setItem(editedStory.Id.toString(), JSON.stringify(editedStory))
        }
    }
    else {
        var previousAddedStory: CustomStory = Object.assign(new CustomStory(), JSON.parse(previousAdded))
        for (var i in newerChoices) {
            for (var j in newerChoices[i]) {
                var findIndex = previousAddedStory.Choices[i].findIndex(x => x.Scenario == newerChoices[i][j].Scenario && x.SelectIndex == newerChoices[i][j].SelectIndex)
                if (findIndex != -1)
                    previousAddedStory.Choices[i][findIndex] = newerChoices[i][j]
                else
                    previousAddedStory.Choices[i].push(newerChoices[i][j])
            }
        }
        localStorage.setItem(editedStory.Id.toString(), JSON.stringify(previousAddedStory))
    }
    console.log(`Saved ${JSON.stringify(editedStory)}`)
}
</script>
 
<template>
    <div id="eventEditor" class="shadow p-3 mb-5 bg-body rounded vue3-menus-item" v-menus:right="menus">
        <div id="leftPart" class="shadow-sm container rounded">
            <SelectCard v-model:card="selectedCard" @categoryChanged="(category) => onCategoryChanged(category)" />
            <EventList :events="events" v-model:selectedEvent="selectedEvent" />
        </div>
        <div id="rightPart" class="shadow-sm container rounded">
            <Choice v-if="selectedEvent.Id != 0" v-for="(choices, index) in editedStory.Choices"
                v-model:selectIndex="editedSelectIndex" v-model:state="editedState" v-model:effect="editedEffect"
                v-model:selectedEffect="selectedEffect" v-model:scenario="editedScenario" :choices="choices"
                :selectedEvent="selectedEvent" v-model:editedIndex="editedIndex" :editingIndex="index"
                :style="`margin-top:${index * 250}px;`" />
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