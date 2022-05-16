<script setup lang="ts">
const { cardId } = defineProps({ cardId: Number });
</script>

<template>
    <div class="container rounded shadow-sm pb-4">
        <img id="icon"
            :src="`https://assets.shuise.net/UmamusumeEventEditor/public/img/icon/chr_icon_${cardId!.toString().substring(0, 4)}_${cardId}_02.png`"
            width="115" height="128" />
        <select id="cardSelect" class="form-select">
            <option>决胜服A</option>
            <option>决胜服B</option>
            <option>S卡A</option>
            <option>S卡B</option>
        </select>
        <select id="categorySelect" class="form-select">
            <option>全部事件</option>
            <option>决胜服事件</option>
            <option>通常事件</option>
            <option>通用事件</option>
        </select>
    </div>
</template>

<style scoped>
img#icon {
    margin-top: 5px
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
</style>