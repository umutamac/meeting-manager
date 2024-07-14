<template>
    <div class="avatarList">
        <v-tooltip v-for="item, i in avatars" :key="`agent_${i}`" location="top">
            <template v-slot:activator="{ props }">
                <v-avatar v-bind="props" :color="item.color"
                    :style="{ 'z-index': l2r ? 100 - i : 100 + i, 'margin-right': -5 + 'px' }">{{ item.text
                    }}</v-avatar>
            </template>
            <div>{{ item.tooltip }}</div>
        </v-tooltip>
    </div>
</template>
<script lang="ts" setup>
import { defineProps, withDefaults, computed } from "vue";
import { Agent } from "../../types";

type Props = {
    agents: Agent.Model[],
    l2r: boolean,
    limit: number
};

const props = withDefaults(defineProps<Props>(), { l2r: true });

const avatars = computed<{ text: string, color: string, tooltip: string }[]>(() => {
    const shortList = props.agents.slice(0, props.limit);
    const overAmount = props.agents.length - props.limit;
    const avatars = shortList.map(item => {
        return {
            text: `${item.name[0]}${item.surname[0]}`,
            color: item.color,
            tooltip: `${item.name} ${item.surname}`
        }
    });
    if (overAmount) {
        const others = props.agents.slice(props.limit);
        avatars.push({
            text: `+${overAmount}`,
            color: "rgb(168, 168, 168)",
            tooltip: others.map(o => `${o.name} ${o.surname}`).join(", ")
        });
    }
    return avatars;
});

</script>
<style scoped>
.avatarList {
    display: flex;
    align-items: center;
}
</style>