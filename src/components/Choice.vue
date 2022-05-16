<script setup lang="ts">
import { Choice } from '@/interfaces/Choice';
import { Tooltip } from 'bootstrap';
import { onMounted, reactive, ref, watch } from 'vue';

const { choice, selectedEvent } = defineProps(['choice', 'selectedEvent'])
const states = {
    0: '0(失败)',
    1: '1(成功)',
    2: '2(大成功)',
    2147483647: '∞(不确定的)'
}
const selectedState = ref("请选择State")
const selectedEffect = ref("")
const inputSelectIndex = ref(null)
const inputEffect = ref("")

function onClick(effect: string) {
    selectedEffect.value = effect
}
watch(selectedEffect, (i) => {
    inputEffect.value = selectedEffect.value
    inputSelectIndex.value = null
})
watch(selectedEvent, () => {
    selectedState.value = "请选择State"
    selectedEffect.value = ""
    inputSelectIndex.value = null
    inputEffect.value = ""
})

const choiceNameInputBox = ref(null);
onMounted(() => {
    new Tooltip(choiceNameInputBox.value!);
});
</script>
<template>
    <div id="Choice" class="border border-primary"
        style="background-color: azure;width: 600px;height: 250px;position: absolute;">
        <div class="row" style="margin-top:7px">
            <div style="width: 55%;">
                <div class="list-group rounded" style="max-height: 233px;overflow:hidden; overflow-y:scroll;">
                    <a href="#" v-for="effect in [choice.SuccessEffect, choice.FailedEffect]"
                        class="list-group-item list-group-item-action" :class="{
                            active: effect != '' && effect == selectedEffect
                        }" @click="onClick(effect)">
                        {{ effect }}
                    </a>
                </div>
            </div>
            <div style="width:44%">
                <input class="form-control" style="font-size:larger;margin-right: 5px;display: block;"
                    data-bs-toggle="tooltip" title="目前还没决定好是否允许汉化" ref="choiceNameInputBox" type="text"
                    :value="choice.Option" readonly>
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Select Index" v-model="inputSelectIndex"
                        style="font-size: medium;margin-top: 2px;">
                    <button class="btn btn-outline-primary dropdown-toggle" type="button" data-bs-toggle="dropdown"
                        style="margin-top: 2px;"> {{ selectedState }} </button>
                    <ul class="dropdown-menu dropdown-menu-end" style="min-width: min-content;">
                        <li v-for="(state, index) in states">
                            <a class="dropdown-item" href="#" @click="() => selectedState = states[index]">
                                {{ state }}
                            </a>
                        </li>
                    </ul>
                </div>
                <textarea class="form-control"
                    style="margin-top: 2px;box-sizing: border-box;height: 100%;max-height: 150px;"
                    v-model="inputEffect"></textarea>
            </div>
        </div>
    </div>
</template>