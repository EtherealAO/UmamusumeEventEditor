<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { Tooltip } from 'bootstrap';
import { onMounted, ref, watch, watchPostEffect } from 'vue';
const { choices, selectedEvent, editingIndex } = defineProps(['choices', 'selectedEvent', 'editingIndex'])
const states: { [index: number]: string } = {
    0: '0(失败)',
    1: '1(成功)',
    2: '2(大成功)',
    2147483647: '∞(不确定的)'
}
const scenarios: { [index: number]: string } = {
    0: '0(通用)',
    2: '2(URA)',
    4: '4(巅峰杯)'
}

const selectedState = ref("请选择State")
const selectedScenario = ref("剧本")
const selectedEffect = ref("")
const inputSelectIndex = ref(null)
const inputEffects = ref(new Map<string, string>())
const currentEditEffect = ref("")
const textareaDisabledTip = ref("请先选择选项和剧本")
const choiceNameInputBox = ref(null);
const textarea = ref(null)
const inputEffectIndex = computed(() => {
    return selectedEffect.value + selectedScenario.value
})
var textareaTooltip: Tooltip = null!

//用来更新selectedEffect
function onEffectClick(effect: string) {
    selectedEffect.value = effect
}
//用来在切换Effect的时候读取之前编辑的内容
watch(selectedEffect, (effect) => {
    var previousEdited = inputEffects.value.get(inputEffectIndex.value)
    if (previousEdited != undefined)
        currentEditEffect.value = previousEdited
    else
        currentEditEffect.value = effect
}, {
    flush: "post"
})
function onStateChange(state: number) {
    selectedState.value = states[state]
}
function onScenarioChange(scenario: number) {
    selectedScenario.value = scenarios[scenario]
    var previousEdited = inputEffects.value.get(inputEffectIndex.value)
    if (previousEdited == undefined && currentEditEffect.value != '') {
        inputEffects.value.set(inputEffectIndex.value, selectedEffect.value)
        currentEditEffect.value = selectedEffect.value
    } else if (previousEdited != undefined) {
        currentEditEffect.value = previousEdited
    }
}
function onEditEffectChange() {
    if (selectedScenario.value == "剧本") return;
    inputEffects.value.set(inputEffectIndex.value, currentEditEffect.value)
}
const isTextareaDisabled = computed(() => {
    return textareaDisabledTip.value != ''
})
onMounted(() => {
    new Tooltip(choiceNameInputBox.value!);
    textareaTooltip = new Tooltip(textarea.value!);
});
watch(currentEditEffect, () => {
    if (selectedScenario.value == "剧本") return;
    inputEffects.value.set(inputEffectIndex.value, currentEditEffect.value)
})
watch([selectedEffect, selectedScenario], ([newerEffect, newerScenario], [elderEffect, elderScenario]) => {
    if (selectedScenario.value == "剧本") return;
    if (selectedEffect.value != "" && selectedScenario.value != "剧本" && textareaDisabledTip.value != '') {
        textareaDisabledTip.value = ''
        textareaTooltip.hide()
    }
    if (elderEffect == newerEffect && newerEffect != '') {
        inputEffects.value.set(inputEffectIndex.value, selectedEffect.value)
        inputSelectIndex.value = null
    }
})
watch(selectedEffect, () => {
    selectedScenario.value = "剧本"
})
watch(selectedEvent, () => {
    selectedState.value = "请选择State"
    selectedEffect.value = ""
    inputSelectIndex.value = null
    textareaDisabledTip.value = "请先选择选项和剧本"
    selectedScenario.value = "剧本"
    textareaTooltip.show()
})
</script>
<template>
    <div id="choice">
        <div class="row">
            <div id="effectPart">
                <div id="effectBox" class="list-group shadow-sm rounded ms-1">
                    <div v-for="choice in choices">
                        <span v-for="effect in choice.Effects" class="list-group-item list-group-item-action clickable "
                            :class="{
                                active: effect != '' && effect == selectedEffect
                            }" @click="onEffectClick(effect)" :style="`height: ${240 / choice.Effects.length}px;`">
                            {{ effect }}
                        </span>
                    </div>
                </div>
            </div>
            <div id="editPart">
                <input class="form-control" data-bs-toggle="tooltip" title="目前还没决定好是否允许汉化" ref="choiceNameInputBox"
                    type="text" :value="choices[0].Option" readonly>
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Select Index"
                        @change="$emit('update:selectIndex', inputSelectIndex)" v-model="inputSelectIndex"
                        style="margin-top: 2px;">
                    <button id="stateDropdownToggleButton" class="btn btn-outline-primary dropdown-toggle" type="button"
                        data-bs-toggle="dropdown" style="margin-top: 2px;">{{ selectedState
                        }}</button>
                    <ul class="dropdown-menu dropdown-menu-end" style="min-width: min-content;">
                        <li v-for="(state, index) in states">
                            <span class="dropdown-item clickable"
                                @click="$emit('update:state', index); onStateChange(index)">
                                {{ state }}
                            </span>
                        </li>
                    </ul>
                    <button id="scenarioDropdownToggleButton" class="btn btn-outline-primary dropdown-toggle"
                        type="button" data-bs-toggle="dropdown" style="margin-top: 2px;">{{ selectedScenario
                        }}</button>
                    <ul class="dropdown-menu dropdown-menu-end" style="min-width: min-content;">
                        <li v-for="(scenario, index) in scenarios">
                            <span class="dropdown-item clickable"
                                @click="$emit('update:scenario', index); onScenarioChange(index)">
                                {{ scenario }}
                            </span>
                        </li>
                    </ul>
                </div>
                <textarea class="form-control"
                    @change="onEditEffectChange(); $emit('update:effect', inputEffects.get(inputEffectIndex)); $emit('update:editedIndex', editingIndex);"
                    v-model="currentEditEffect" :readonly="isTextareaDisabled"
                    :class="{ disabledTextarea: isTextareaDisabled }" data-bs-toggle="tooltip"
                    :title="textareaDisabledTip" ref="textarea"></textarea>
            </div>
        </div>
    </div>
</template>

<style scoped>
#choice {
    /*background-color: azure;*/
    width: 600px;
    height: 250px;
    /*position: absolute;*/
    display: inherit;
}

#effectPart {
    width: 55%;
}

#effectBox {
    min-width: 400px;
    max-width: 400px;
    max-height: 240px;
    /*overflow: hidden;
    overflow-y: auto;*/
}

#editPart {
    width: 44%;
}

textarea.disabledTextarea {
    cursor: not-allowed;
}

span.clickable {
    user-select: none;
    cursor: pointer;
}

span.active {
    z-index: 0 !important;
}

.list-group-item-action:focus,
.list-group-item-action:hover {
    z-index: 0 !important;
}

button#stateDropdownToggleButton {
    width: 130px;
}

button#scenarioDropdownToggleButton {
    width: 110px;
}

input .form-control {
    font-size: medium;
    margin-right: 5px;
    display: block;
}

textarea.form-control {
    margin-top: 2px;
    box-sizing: border-box;
    height: 100%;
    max-height: 150px;
}
</style>