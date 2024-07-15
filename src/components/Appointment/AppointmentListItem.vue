<template>
    <div class="listItem">
        <div class="contactInfo">
            <template v-if="_appointment.contact[0]">
                <div>  <v-icon>mdi-home</v-icon>
                    {{ _appointment.contact[0].name }} {{ _appointment.contact[0].surname }}</div>
                <div>{{ _appointment.contact[0].email }}</div>
                <div>{{ _appointment.contact[0].phone }}</div>
                <div class="debug">{{ _appointment.id }}</div>
            </template>
        </div>
        <div class="addressInfo">
            <div>  <v-icon>mdi-home</v-icon>
                {{ _appointment.address }}</div>
        </div>
        <div class="dateInfo">
            <div class="status">
                <div :style="{ color: status.color }">{{ status.kind }}</div>
                <div v-if="status.kind == 'Upcoming'">{{ status.remainingDays }} days</div>
            </div>
            <div>{{ isoDateToLocal(_appointment.date) }}</div>
        </div>
        <AgentAvatarList :agents="agentsForAppoitnments" :l2r="true" :limit="3" />
    </div>
</template>

<script lang="ts" setup>
import { defineProps, ref, computed, watch, onMounted } from "vue";
import type { Appointment, Agent } from "../../types";
import { COMMON } from "../../utils";

type Props = {
    appointment: Appointment.Model
    agents: Agent.Model[]
};
const props = defineProps<Props>();

const _appointment = ref<Appointment.Model>(props.appointment);

const status = computed<{ kind: "Completed", color: string } | { kind: "Upcoming", color: string, remainingDays: number } | { kind: "Canceled", color: string }>(() => {
    const now = Date.now();
    const date = COMMON.Dates.dateStringToTS(_appointment.value.date);
    const kind = now > date ? "Completed" : "Upcoming";
    const remainingDays = COMMON.Dates.getDaysBetweenTimestamps(now, date);
    return kind == "Completed" ? { kind, color: "green" } : { kind, color: "orange", remainingDays };
})

const agentsForAppoitnments = computed(() => {
    const agents = [...props.agents].filter(a => a.appointments.map(appointmentId => appointmentId == _appointment.value.id));
    return agents
})

const isoDateToLocal = COMMON.Dates.isoDateToLocal

watch(() => props.appointment,
    (newValue: Appointment.Model) => {
        _appointment.value = newValue;
    },
    { immediate: true, deep: true }
)

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
