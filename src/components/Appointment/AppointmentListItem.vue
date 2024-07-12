<template>
    <div class="listItem">
        <div class="contactInfo">
            <div>{{ _appointment.firstName }} {{ _appointment.surName }}</div>
            <div>{{ _appointment.email }}</div>
            <div>{{ _appointment.phone }}</div>
        </div>
        <div class="addressInfo">
            <div>{{ _appointment.address }}</div>
        </div>
        <div class="dateInfo">
            <div class="status">
                <div :style="{ color: status.color }">{{ status.kind }}</div>
                <div v-if="status.kind == 'Upcoming'">{{ status.remainingDays }} days</div>
            </div>
            <div>{{ formatDate(_appointment.date) }}</div>
        </div>
        <AgentAvatarList :agents="_appointment.agents" :l2r="true" :limit="3" />
    </div>
</template>

<script lang="ts" setup>
import { defineProps, ref, computed, onMounted } from "vue";
import type { Appointment } from "../../types";
import { COMMON } from "../../utils";

type Props = { appointment: Appointment.Model };
const props = defineProps<Props>();

const _appointment = ref<any>(props.appointment);

const status = computed<{ kind: "Completed", color: string } | { kind: "Upcoming", color: string, remainingDays: number } | { kind: "Canceled", color: string }>(() => {
    const kind = Date.now() > _appointment.value.date ? "Completed" : "Upcoming";
    const remainingDays = COMMON.getDaysBetweenTimestamps(Date.now(), _appointment.value.date);
    return kind == "Completed" ? { kind, color: "green" } : { kind, color: "orange", remainingDays };
})

const formatDate = COMMON.formatDate

onMounted(() => {
    //appointment.value = COMMON.deepCopy(props._appointment);
})
</script>

<style scoped>
.listItem {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    align-items: center;
    justify-items: center;
    padding: 10px 10px;
}

.contactInfo {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.contactInfo> :first-child {
    font-weight: 700;
}

.addressInfo {
    justify-self: left;
    font-weight: 700;
    max-width: 500px;
}

.dateInfo {
    display: grid;
    align-items: center;
    justify-content: space-between;
    grid-template-columns: repeat(2, auto);
    gap: 10px;
    padding: 15px;


    background-color: pink;
    border-radius: 15px;
    color: white
}

.dateInfo>.status {
    background-color: white;
    color: black;

    border-radius: 10px;
    padding: 15px;

}

.dateInfo>.status>:first-child {
    font-weight: 700;
}
</style>
