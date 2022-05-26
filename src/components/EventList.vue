<script setup lang="ts">
const { events, selectedEvent } = defineProps(['events', 'selectedEvent'])
</script>

<template>
    <div id="eventList" class="list-group rounded shadow-sm">
        <span id="eventName" class="list-group-item list-group-item-action clickable" v-for="story in events"
            :key="story.Id" @click="selectedEvent.Apply(story); $emit('update:selectedEvent', selectedEvent)"
            :class="{ active: selectedEvent.Id == story.Id }">
            {{ story.Name }}
        </span>
    </div>
</template>

<style scoped>
div#eventList {
    /* background-color: aqua; */
    margin-top: 20px;
    margin-bottom: 20px;
    max-height: 500px;
    overflow: hidden;
    overflow-y: auto;
}

span#eventName {
    width: 300px;
}

span.clickable {
    user-select: none;
    cursor: pointer;
}
</style>