<script setup lang="ts">
const { cardId } = defineProps({ cardId: Number })
</script>

<template>
    <div class="list-group rounded"
        style="background-color: aqua;margin-top: 20px;margin-bottom: 20px;max-height: 500px;overflow:hidden; overflow-y:scroll;">
        <a href="#" class="list-group-item list-group-item-action active" style="width: 300px;">雲の向こう、宙のかなた</a>
        <a href="#" class="list-group-item list-group-item-action" style="width: 300px;"
            v-for="eventName in Events[cardId!]" :key="eventName.Id">
            {{ eventName.Name }}
        </a>
    </div>
</template>