<script setup lang="ts">
import type { Card } from '@/interfaces/Card';
import { watch, inject, ref, watchEffect } from 'vue';
const cards = inject<Card[]>('cards')
const defaultIcon = '/img/icon/chr_icon_0000.png'
const runningStyles = ['逃', '先', '差', '追']

const filteredCards = ref<Card[]>([])
const filterRunningStyle = ref<{ [runningStyle: string]: number[]; }>({})
for (var runningStyle of runningStyles) filterRunningStyle.value[runningStyle] = [0, 0, 0, 0, 0, 0, 0]
var cardSelection = ref<Card>();
var categorySelection = ref("all")

watchEffect(() => {
    if (cards == undefined) return
    filteredCards.value.length = 0
    //for (var i in filterRunningStyle.value) {
    //    for (var j of filterRunningStyle.value[i]) {
    //        filteredCards.value.push(...cards.filter((element) => element.ProperRunningStyle[i] == j && filteredCards.value.indexOf(element) == -1))
    //    }
    //}
    for (var card of cards) {
        var pick = true
        //for (var runningStyle in filterRunningStyle.value) {
        //    for (var index of filterRunningStyle.value[runningStyle]) {
        //        if (filterRunningStyle.value[runningStyle][index - 1] == undefined) continue
        //        if (!(filteredCards.value.indexOf(card) == -1 && card.ProperRunningStyle[runningStyle] == filterRunningStyle.value[runningStyle][index - 1])) {
        //            pick = false
        //        } else {
        //            console.log(`${runningStyle} ${filterRunningStyle.value[runningStyle][index - 1]}`)
        //        }
        //    }
        //}
        pick = test(card, filterRunningStyle.value)
        if (pick) {
            filteredCards.value.push(card)
        }
    }
})
function test(card: Card, dic: any) {
    var pick = true
    for (var type in dic) {
        for (var index of dic[type]) {
            if (dic[type][index - 1] == undefined) continue
            if (!(filteredCards.value.indexOf(card) == -1 && card.ProperRunningStyle[type] == dic[type][index - 1])) {
                pick = false
            } else {
                console.log(`${type} ${dic[type][index - 1]}`)
            }
        }
    }
    return pick
}
function onCategoryChanged(event: any) {
    categorySelection.value = event.target.value
}
function onCardSelected(card: any) {
    cardSelection.value = card
}
function getIconPath(card: Card | undefined) {
    return card == undefined ? defaultIcon : `/img/icon/chr_icon_${card.Id.toString().substring(0, 4)}_${card.RaceDressId}_02.png`
}
function getProperText(proper: number) {
    switch (proper) {
        case 1:
            return "G"
        case 2:
            return "F"
        case 3:
            return "E"
        case 4:
            return "D"
        case 5:
            return "C"
        case 6:
            return "B"
        case 7:
            return "A"
    }
}
</script>

<template>
    <div class="container rounded shadow-sm pb-4">
        <img id="selectedIcon" :src="getIconPath(cardSelection)" data-bs-toggle="modal"
            data-bs-target="#selectCardModal" />
        <select id="cardSelect" class="form-select" @change="$emit('update:card')">
            <option>决胜服A</option>
            <option>决胜服B</option>
            <option>S卡A</option>
            <option>S卡B</option>
        </select>
        <select id="categorySelect" class="form-select"
            @change="onCategoryChanged($event); $emit('categoryChanged', categorySelection)">
            <option value='all'>全部事件</option>
            <option value='special'>决胜服事件</option>
            <option value='common'>通常事件</option>
            <option value='universal'>共通事件</option>
            <option value='system'>系统事件</option>
            <option value='ura'>URA事件</option>
            <option value='aoharu'>青春杯事件</option>
            <option value='climax'>巅峰杯事件</option>
        </select>
        <div class="modal modal-dialog-centered fade" id="selectCardModal" tabindex="-1"
            aria-labelledby="selectCardModalLabel" aria-hidden="true" style="display:none">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header" style="display: block;">
                        <ul class="nav nav-pills justify-content-center">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="#">Active</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Link</a>
                            </li>
                        </ul>
                    </div>
                    <div class="modal-body">
                        <div style="text-align:center">
                            <img id="icon" v-for="card in filteredCards"
                                @click="$emit('update:card', card); onCardSelected(card)" :src="getIconPath(card)"
                                data-bs-toggle="modal" data-bs-target="#selectCardModal" />
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas"
                            data-bs-target="#filterOffcanvas" aria-controls="filterOffcanvas">
                            Filter
                        </button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="offcanvas offcanvas-start" data-bs-backdrop="false" tabindex="-1" id="filterOffcanvas"
            aria-labelledby="filterOffcanvasLabel">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="filterOffcanvasLabel">筛选</h5>
                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas"
                    aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <div class="container">
                    按适性：<br />
                    <div v-for="i in runningStyles" class="dropdown dropdown-running-style" :id="i">
                        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-auto-close="outside"
                            :id="`dropdownMenu${i}`" data-bs-toggle="dropdown" aria-expanded="false">
                            {{ i }}
                        </button>
                        <ul class="dropdown-menu" :aria-labelledby="`dropdownMenu${i}`">
                            <li v-for="j in Array.from(Array(7).keys()).reverse()">
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" role="switch"
                                        :id="getProperText(j + 1)"
                                        @change="filterRunningStyle[i][j] = filterRunningStyle[i][j] == 0 ? j + 1 : 0">
                                    <label class="form-check-label" :for="getProperText(j + 1)">{{ getProperText(j + 1)
                                    }}</label>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
img#icon {
    width: 76px;
    height: 84.5px;
    margin-top: 5px;
    cursor: pointer;
}

img#selectedIcon {
    width: 115px;
    height: 128px;
    margin-top: 5px;
    cursor: pointer;
}

select#cardSelect {
    width: 150px;
    margin-top: 25px;
    display: inline;
    position: absolute;
    margin-left: 10px;
}

select#categorySelect {
    width: 150px;
    margin-top: 85px;
    display: inline;
    position: absolute;
    margin-left: 10px;
}

#filterOffcanvas {
    z-index: 1100;
}

.dropdown.dropdown-running-style {
    display: inline;
    margin-left: 20px;
}

.dropdown-menu,
label.form-check-label {
    min-width: 2rem;
}
</style>