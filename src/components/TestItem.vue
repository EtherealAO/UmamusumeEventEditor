<script setup lang="ts">
import SelectCard from "./SelectCard.vue";
import EventList from "./EventList.vue";
import Choice from "./Choice.vue";
import { inject, reactive, ref } from "vue";
import { Story } from "@/interfaces/Story";

const selectedEvent = reactive(new Story())
const selectedCard = ref(103301)
const supportEvents: { [cardId: number]: Story[]; } = inject('supportEvents')!
const characterEvents: { [cardId: number]: Story[]; } = inject('characterEvents')!
const isSupport = false;
const allEvents = isSupport ? supportEvents : characterEvents;
const events: Story[] = reactive(allEvents[selectedCard.value].concat(allEvents[Number.parseInt(selectedCard.value.toString().substring(0, 4))]))

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
</script>

<template>
    <div id="eventEditor" class="shadow p-3 mb-5 bg-body rounded">
        <div id="leftPart" class="shadow-sm container rounded">
            <SelectCard :cardId="selectedCard" @cardChanged="(cardId) => onCardChanged(cardId)"
                @categoryChanged="(category) => onCategoryChanged(category)" />
            <EventList :events="events" @eventSelected="(selected) => selectedEvent.Apply(selected)" />
        </div>
        <div id="rightPart" class="shadow-sm container rounded">
            <Choice v-if="selectedEvent.Id != 0" v-for="(choice, index) in selectedEvent.Choices" :choice="choice"
                :selectedEvent="selectedEvent" :style="`margin-top:${index * 250}px;`" />
        </div>
    </div>
</template>

<style scoped>
div#eventEditor {
    margin: 10%;
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