<template>
    <div class="pagination">
        <v-btn :disabled="pagination.current == 1" @click="paginate(pagination.current - 1)"> back </v-btn>
        <v-btn v-for="i in buttons" :key="`pag_${i}`" small :disabled="i == pagination.current" @click="paginate(i)">{{
            i }}</v-btn>
        <v-btn :disabled="pagination.isLast" @click="paginate(pagination.current + 1)"> next </v-btn>
    </div>
</template>

<script lang="ts" setup>
import { withDefaults, defineProps, ref, computed, defineEmits } from "vue";

type Props = {
    totalLength: number
    pageSize: number
};
const props = withDefaults(defineProps<Props>(), { pageSize: 10 });

const buttonCount = 4;

/* eslint-disable no-unused-vars */
type Emit = {
    (e: "paginate", value: { offset: number }): void;
};
const emit = defineEmits<Emit>();
/* eslint-enable no-unused-vars */

const pagination = ref<{ current: number, isLast: boolean, pageSize: number }>({ current: 1, isLast: false, pageSize: 10 });


async function paginate(to: number) {
    pagination.value.current = to;

    emit("paginate", { offset: props.pageSize * (pagination.value.current - 1) });
}

const totalPagesPossible = computed<number>(() => {
    return Math.ceil(props.totalLength / props.pageSize);
})

const buttons = computed<number[]>(() => {
    //console.log("totalPagesPossible", totalPagesPossible.value);
    const from = (pagination.value.current - buttonCount) > 0 ? pagination.value.current - buttonCount : 1;
    const to = (pagination.value.current + buttonCount) < totalPagesPossible.value ? pagination.value.current + buttonCount : totalPagesPossible.value;
    //console.log("from", from, "to", to);

    const arr = Array.from({ length: to - from + 1 }, (_, index) => from + index);
    //console.log("buttons", arr);
    return arr;
})


</script>

<style scoped>
.pagination {
    display: flex;
    align-items: center;
    justify-content: end;
    gap: 10px;
}
</style>
