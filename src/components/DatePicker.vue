<template>
    <v-container class="container">
        <v-menu v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y min-width="290px">
            <template #activator="{ props: menuProps }">
                <div v-bind="menuProps"> 
                    <v-text-field v-model="formattedDate" :label="props.label"
                        prepend-icon="mdi-calendar" readonly hide-details></v-text-field>
                </div>
            </template>
            <v-date-picker v-model="date" @input="updateTimestamp"></v-date-picker>
        </v-menu>
    </v-container>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults, ref, computed, watch, defineEmits, } from "vue";

type Props = { modelValue: number, label: string }
const props = withDefaults(defineProps<Props>(), { label: "Select Date" })

/* eslint-disable no-unused-vars */
type Emit = {
    (e: "update:model-value", value: number | null): void;
};
const emit = defineEmits<Emit>();
/* eslint-enable no-unused-vars */

const menu = ref(false)
const timestamp = ref(0) // Initialize with the current timestamp
const date = computed({
    get: () => {
        const d = new Date(timestamp.value)
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    },
    set: (val: string) => {
        timestamp.value = new Date(val).getTime()
    },
})

const formattedDate = computed(() => {
    const d = new Date(timestamp.value)
    return d.toLocaleDateString()
})

function updateTimestamp() {
    timestamp.value = new Date(date.value).getTime();
    emit("update:model-value", timestamp.value);
}

watch(() => props.modelValue,
    (newValue: number | null) => {
        timestamp.value = newValue ? newValue : Date.now()
    },
    { immediate: true, deep: true }
)
</script>

<style scoped>
.container {
    min-width: 200px;
}
</style>