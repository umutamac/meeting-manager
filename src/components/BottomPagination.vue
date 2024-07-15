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
    // const maxButtonCount = 5;

    const paginationArray = [];

    // Logic to determine start and end indices based on currentPage
    let start = Math.max(1, pagination.value.current - 2);
    let end = Math.min(start + 4, totalPagesPossible.value);

    // If at the end, adjust the start index
    if (end - start < 4) {
        start = Math.max(1, end - 4);
    }
    for (let i = start; i <= end; i++) {
        paginationArray.push(i);
    }
    //console.log("buttons", paginationArray);
    return paginationArray;
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
