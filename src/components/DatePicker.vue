<template>
    <div class="container">
        <div class="container">
            <v-menu v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y
                min-width="290px">
                <template #activator="{ props: menuProps }">
                    <div v-bind="menuProps">
                        <v-text-field v-model="localDateString" :label="props.label" prepend-inner-icon="mdi-calendar"
                            readonly hide-details bg-color="white"></v-text-field>
                    </div>
                </template>
                <v-date-picker v-model="date" @update:model-value="updateTimestamp"
                    :allowed-dates="isDateAllowed"></v-date-picker>
            </v-menu>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults, ref, computed, watch, defineEmits, } from "vue";

type Props = {
    modelValue: string, // ISO string
    label: string,
    disableAfter?: string,
    disableBefore?: string
}
const props = withDefaults(defineProps<Props>(), { label: "Select Date" })

/* eslint-disable no-unused-vars */
type Emit = {
    (e: "date-changed", value: string | null): void;
};
const emit = defineEmits<Emit>();
/* eslint-enable no-unused-vars */

const menu = ref<boolean>(false)
const ISOdateString = ref<string>(props.modelValue ? new Date(props.modelValue).toISOString() : new Date().toISOString())
const date = computed({
    get: () => {
        return new Date(ISOdateString.value);
    },
    set: (val: Date) => {
        ISOdateString.value = val.toISOString();
    },
})

const localDateString = computed<string>(() => {
    return new Date(ISOdateString.value).toLocaleDateString()
})

function updateTimestamp() {
    ISOdateString.value = new Date(date.value).toISOString();
    //console.log("dateString", ISOdateString.value);
    emit("date-changed", ISOdateString.value);
}


const isDateAllowed = (date: unknown) => {
    const cond1 = props.disableBefore ? new Date(date as string) >= new Date(props.disableBefore) : true;
    const cond2 = props.disableAfter ? new Date(date as string) <= new Date(props.disableAfter) : true;
    return cond1 && cond2;
};

watch(() => props.modelValue,
    (newValue: string | null) => {
        ISOdateString.value = newValue ? newValue : new Date().toISOString();
    },
    { immediate: true, deep: true }
)
</script>

<style scoped>
.container {
    cursor: pointer;
    min-width: 200px;
}
</style>