<template>
    <div class="avatarList">
        <AgentAvatar v-for="agent, i in _agents" :key="`agent_${i}`" :firstName="agent.firstName"
            :lastName="agent.lastName" :color="agent.color"
            :style="{ 'z-index': l2r ? 100 - i : 100 + i, 'margin-right': -5 + 'px' }" />
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

const _agents = computed<Agent.Model[]>(() => {
    const shortList = props.agents.slice(0, props.limit);
    // add '+5' icon if over a limit
    if ((props.agents.length - props.limit) > 0) shortList.push({ firstName: "+", lastName: String(props.agents.length - props.limit), color: "beige" });
    return shortList;
});

</script>
<style scoped>
.avatarList {
    display: flex;
    align-items: center;
}
</style>