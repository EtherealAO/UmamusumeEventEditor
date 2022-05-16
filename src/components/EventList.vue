<script setup lang="ts">
import { Story } from '@/interfaces/Story';
import { reactive, watch } from 'vue';

const { cardId } = defineProps({ cardId: Number })
const selectedEvent: Story = reactive(new Story())

function isActive(story: Story) {
    return selectedEvent.Id == story.Id;
}
function onClick(story: Story) {
    selectedEvent.Apply(story)
}
</script>

<template>
    <div class="list-group rounded"
        style="background-color: aqua;margin-top: 20px;margin-bottom: 20px;max-height: 500px;overflow:hidden; overflow-y:scroll;">
        <a href="#" class="list-group-item list-group-item-action" style="width: 300px;"
            v-for="story in Events[cardId!]" :key="story.Id"
            @click="onClick(story); $emit('eventSelected', selectedEvent)" :class="{ active: isActive(story) }">
            {{ story.Name }}
        </a>
    </div>
</template>