<script setup lang="ts">
const { choice } = defineProps(['choice'])
</script>
<template>
    <div id="Choice" class="border border-primary"
        style="background-color: azure;width: 600px;height: 250px;position: absolute;">
        <div class="row" style="margin-top:7px">
            <div style="width: 55%;">
                <div class="list-group rounded" style="max-height: 233px;overflow:hidden; overflow-y:scroll;">
                    <a href="#" class="list-group-item list-group-item-action"
                        v-for="effect in [choice.SuccessEffect, choice.FailedEffect]">
                        {{ effect }}
                    </a>
                </div>
            </div>
            <div style="width:44%">
                <input class="form-control" style="font-size:larger;margin-right: 5px;display: block;"
                    data-bs-toggle="tooltip" title="目前还没决定好是否允许汉化" ref="choiceNameInputBox" type="text"
                    :value="choice.Option" readonly>
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Select Index"
                        style="font-size: medium;margin-top: 2px;">
                    <button class="btn btn-outline-primary dropdown-toggle" type="button" data-bs-toggle="dropdown"
                        style="margin-top: 2px;">请选择State</button>
                    <ul class="dropdown-menu dropdown-menu-end" style="min-width: min-content;">
                        <li><a class="dropdown-item" href="#">0(失败)</a></li>
                        <li><a class="dropdown-item" href="#">1(成功)</a></li>
                        <li><a class="dropdown-item" href="#">2(大成功)</a></li>
                        <li>
                            <hr class="dropdown-divider">
                        </li>
                        <li><a class="dropdown-item" href="#">∞(不确定的)</a></li>
                    </ul>
                </div>
                <textarea class="form-control"
                    style="margin-top: 2px;box-sizing: border-box;height: 100%;max-height: 150px;"></textarea>
            </div>
        </div>
    </div>
</template>