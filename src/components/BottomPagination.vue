<template>
    <div class="pagination">
        <v-btn :disabled="pagination.current == 1" @click="paginate(pagination.current - 1)" :size="buttonSize"><v-icon>mdi-chevron-left</v-icon></v-btn>
        <v-btn v-for="i in buttons" :key="`pag_${i}`" small :disabled="i == pagination.current" @click="paginate(i)" :size="buttonSize">{{
            i }}</v-btn>
        <v-btn :disabled="isLast" @click="paginate(pagination.current + 1)" :size="buttonSize"><v-icon>mdi-chevron-right</v-icon></v-btn>
    </div>
</template>

<script lang="ts" setup>
import { withDefaults, defineProps, ref, computed, defineEmits } from "vue";
import { useDisplay } from 'vuetify';

const { smAndDown } = useDisplay();

type Props = {
    totalLength: number
    pageSize: number
    isLast: boolean
};
const props = withDefaults(defineProps<Props>(), { pageSize: 10 });


/* eslint-disable no-unused-vars */
type Emit = {
    (e: "paginate", value: { offset: number }): void;
};
const emit = defineEmits<Emit>();
/* eslint-enable no-unused-vars */

const pagination = ref<{ current: number, pageSize: number }>({ current: 1, pageSize: 10 });


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

// Define a computed property for button size
const buttonSize = computed(() => {
  return smAndDown ? "small" : "default";
});
</script>

<style scoped>
.pagination {
    display: flex;
    align-items: center;
    justify-content: end;
    gap: 10px;
}
</style>
