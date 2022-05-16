<script setup lang="ts">
import SelectCard from "./SelectCard.vue";
import EventList from "./EventList.vue";
import Choice from "./Choice.vue";
import { reactive } from "vue";
import { Story } from "@/interfaces/Story";

const selectedEvent = reactive(new Story())
</script>

<template>
    <div id="eventEditor" class="shadow p-3 mb-5 bg-body rounded">
        <div id="leftPart" class="shadow-sm container rounded">
            <SelectCard :cardId="103301" />
            <EventList :cardId="103301" @eventSelected="(selected) => selectedEvent.Apply(selected)" />
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
    min-height: 600px;
    min-width: 1000px;
}

div#leftPart {
    /*background-color: pink;*/
    width: min-content;
    float: left;
}

div#rightPart {
    /*background-color: blanchedalmond;*/
    display: table-row;
}
</style>