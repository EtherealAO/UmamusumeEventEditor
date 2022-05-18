<script setup lang="ts">
import { Toast } from 'bootstrap';
import { ref, watch } from 'vue';
const props = defineProps(['content'])

const toast = ref(null)
watch(toast, (i) => {
    if (i == null) return;
    new Toast(i!, {
        delay: 3000
    }).show()
})
</script>

<template>
    <div class="toast bottom-0 end-0" role="alert" ref="toast" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
            <div class="toast-body">
                {{ props.content }}
            </div>
            <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    </div>
</template>

<style scoped>
.toast {
    position: absolute;
    margin-bottom: 10px;
    margin-right: 10px;
}
</style>