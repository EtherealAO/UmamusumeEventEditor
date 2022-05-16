<script setup lang="ts">
import SelectCard from "./SelectCard.vue";
import EventList from "./EventList.vue";
import Choice from "./Choice.vue";
import { reactive, watch } from "vue";
import { Story } from "@/interfaces/Story";

const selectedEvent = reactive(new Story())

watch(selectedEvent, (story) => {
    console.log(story)
})
</script>

<template>
    <div id="LeftPart" class="container rounded" style="background-color: pink;width:min-content;float: left;">
        <SelectCard :cardId="103301" />
        <EventList :cardId="103301" @eventSelected="(selected) => selectedEvent.Apply(selected)" />
    </div>
    <div id="RightPart" class="container rounded" style="background-color: blanchedalmond;display: table-row;">
        <Choice v-for="choice in selectedEvent.Choices" :choice="choice" />
    </div>
</template>