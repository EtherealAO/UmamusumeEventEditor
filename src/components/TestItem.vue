<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Tooltip } from "bootstrap";
import SelectCard from "./SelectCard.vue";
import EventList from "./EventList.vue";
import Choice from "./Choice.vue";

const choiceNameInputBox = ref(null);

onMounted(() => {
    new Tooltip(choiceNameInputBox.value!);
});
</script>

<template>
    <div id="LeftPart" class="container rounded" style="background-color: pink;width:min-content;float: left;">
        <SelectCard :cardId="103301" />
        <EventList :cardId="103301" />
    </div>
    <div id="RightPart" class="container rounded" style="background-color: blanchedalmond;display: table-row;">
        <Choice v-for="choice in Events[103301][0]?.Choices" :choice="choice" />
    </div>
</template>