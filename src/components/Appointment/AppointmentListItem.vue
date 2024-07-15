<template>
    <div class="listItem">
        <div class="contactInfo">
            <template v-if="contacts[0]">
                <div><v-icon>mdi-face</v-icon> {{ contacts[0].name }} {{ contacts[0].surname }}</div>
                <div><v-icon>mdi-mail</v-icon> {{ contacts[0].email }}</div>
                <div><v-icon>mdi-call</v-icon> {{ contacts[0].phone }}</div>
                <!-- <div class="debug">id {{ _appointment.id }}</div> -->
            </template>
        </div>
        <div class="addressInfo">
            <v-icon>mdi-home</v-icon>
            <div>{{ maxString(_appointment.address, 25) }}</div>
            <!-- <div>{{ _appointment.address }}</div> -->
        </div>
        <div class="dateInfo">
            <div class="status">
                <div :style="{ color: status.color }">{{ status.kind }}</div>
                <div v-if="status.kind == 'Upcoming'">{{ status.remainingDays }} days</div>
            </div>
            <div><v-icon>mdi-schedule</v-icon> {{ formatDateTime(_appointment.date) }}</div>
        </div>
        <AgentAvatarList :agents="agentsForAppointments" :l2r="true" :limit="3" />
    </div>
</template>

<script lang="ts" setup>
import { defineProps, ref, computed, watch } from "vue";
import type { Appointment, Agent, Contact } from "../../types";
import { COMMON, FILTER } from "../../utils";

type Props = {
    appointment: Appointment.Model
    agents: Agent.Model[],
    contacts: Contact.Model[]
};
const props = defineProps<Props>();

const _appointment = ref<Appointment.Model>(props.appointment);

const status = computed<{ kind: "Completed", color: string } | { kind: "Upcoming", color: string, remainingDays: number } | { kind: "Canceled", color: string }>(() => {
    if (_appointment.value.isCanceled) return { kind: "Canceled", color: "red" };
    const now = Date.now();
    const date = COMMON.Dates.dateStringToTS(_appointment.value.date);
    const kind = now > date ? "Completed" : "Upcoming";
    return kind == "Completed" ? { kind, color: "green" } : { kind, color: "orange", remainingDays: COMMON.Dates.getDaysBetweenTimestamps(now, date) };
})

const agentsForAppointments = computed(() => {
    const agentList = [...props.agents].filter(agent => agent.appointments.map(appointmentId => appointmentId == _appointment.value.id));
    return agentList
})

const formatDateTime = COMMON.Dates.formatDateTime;
const maxString = FILTER.truncateString;

watch(() => props.appointment,
    (newValue: Appointment.Model) => {
        _appointment.value = newValue;
    },
    { immediate: true, deep: true }
)

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
    display: flex;
    align-items: center;

    font-weight: 700;
    max-width: 400px;
}

.addressInfo>:nth-child(2) {
    word-wrap: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
}

.dateInfo {
    display: grid;
    align-items: center;
    justify-content: space-between;
    grid-template-columns: repeat(2, auto);
    gap: 10px;

    padding: 15px;
    background-color: rgb(243, 109, 131);
    border-radius: 15px;
    color: white
}

.dateInfo>.status {
    width: 100%;
    display: flex;
    gap: 5px;
    background-color: white;
    color: black;

    border-radius: 10px;
    padding: 15px;
}

.dateInfo>.status>:first-child {
    font-weight: 700;
}
</style>
