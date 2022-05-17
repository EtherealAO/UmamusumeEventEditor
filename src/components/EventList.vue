<script setup lang="ts">
import { Story } from '@/interfaces/Story';
import { reactive } from 'vue';

const { events } = defineProps(['events'])
const selectedEvent: Story = reactive(new Story())

function onClick(story: Story) {
    console.log(`child: ${events.length}`)
    selectedEvent.Apply(story)
}
</script>

<template>
    <div id="eventList" class="list-group rounded shadow-sm">
        <a id="eventName" href="#" class="list-group-item list-group-item-action" v-for="story in events"
            :key="story.Id" @click="onClick(story); $emit('eventSelected', selectedEvent)"
            :class="{ active: selectedEvent.Id == story.Id }">
            {{ story.Name }}
        </a>
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

a#eventName {
    width: 300px;
}
</style>