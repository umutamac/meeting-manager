<template>
    <v-menu location="bottom" :close-on-content-click="false">
        <template v-slot:activator="{ props }">
            <AgentAvatarList v-bind="props" :agents="agents" :l2r="false" :limit="5" style="cursor: pointer;" />
        </template>
        <v-card>
            <v-list>
                <v-list-item v-for="agent, i in agents" :key="`select_option_${i}`" class="listItem">
                    <v-checkbox v-model="selectedAgents" :value="agent.record_id"
                        :label="`${agent.name} ${agent.surname}`" density="compact" hide-details />
                </v-list-item>
            </v-list>
        </v-card>
    </v-menu>
</template>
<script lang="ts" setup>
import { defineProps, ref, defineEmits, watch } from "vue";
import { Agent } from "../../types";

type Props = {
    agents: Agent.Model[],
    modelValue: string[]
};

const props = defineProps<Props>();

/* eslint-disable no-unused-vars */
type Emit = {
    (e: "update:model-value", value: string[]): void;
};
const emit = defineEmits<Emit>();
/* eslint-enable no-unused-vars */

const selectedAgents = ref<string[]>([]);

watch(() => props.modelValue,
    (newValue: string[]) => {
        //console.log("watcher", newValue);
        if (newValue) {
            selectedAgents.value = newValue;
        }
    },
    { immediate: true, deep: true }
)
watch(selectedAgents,
    (newValue: string[]) => {
        emit("update:model-value", newValue);
    },
    { deep: true }
);
</script>
<style scoped>
.listItem {
    display: flex;
    align-items: center;
}
</style>