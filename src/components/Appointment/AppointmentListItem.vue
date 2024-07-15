<template>
    <div class="listItem">
        <div class="info">
            <div class="contactInfo">
                <template v-if="contacts[0]">
                    <div><v-icon>mdi-account</v-icon> <span>{{ contacts[0].name }} {{ contacts[0].surname }}</span></div>
                    <div><v-icon class="mr-1">mdi-mail</v-icon> <span>{{ contacts[0].email }}</span></div>
                    <div><v-icon class="mr-1">mdi-phone</v-icon> <span>{{ contacts[0].phone }}</span></div>
                    <!-- <div class="debug">id {{ _appointment.id }}</div> -->
                </template>
                <div v-else>No contact information</div>
            </div>
            <div class="addressInfo">
                <v-icon class="mr-1">mdi-home</v-icon>
                <div>{{ maxString(_appointment.address, 35) }}</div>
            </div>
            <div class="dateAndStatusInfo">
                <div class="statusInfo">
                    <div :style="{ color: status.color }">{{ status.kind }}</div>
                    <div v-if="status.kind == 'Upcoming'">{{ status.remainingDays }} days</div>
                </div>
                <div class="dateInfo">
                    <v-icon class="mr-1">mdi-clock-time-five-outline</v-icon> 
                    <span>{{ formatDateTime(_appointment.date) }}</span>
                </div>
            </div>
        </div>

        <AgentAvatarList class="agentInfo" :agents="agentsForAppointments" :l2r="true" :limit="3" />
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

const status = computed<{ kind: "Completed", color: string } | { kind: "Upcoming", color: string, remainingDays: number } | { kind: "Cancelled", color: string }>(() => {
    if (_appointment.value.isCancelled) return { kind: "Cancelled", color: "red" };
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
    grid-template-columns: 6fr 1fr;
    align-items: center;
    /* justify-items: center; */
    gap: 10px;
    padding: 10px 40px;
}
.info {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    align-items: center;
    justify-items: center;
    gap: 10px;
    /* padding: 10px 40px; */
}
.contactInfo {
    justify-self: start;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.contactInfo> :first-child {
    font-weight: 700;
}

.contactInfo> :not(:first-child) {
    font-size: smaller;
}

.addressInfo {
    justify-self: stretch;
    display: flex;
    align-items: center;

    font-weight: 700;
    /* max-width: 400px; */
}

.addressInfo>:nth-child(2) {
    word-wrap: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
}

.dateAndStatusInfo {
    justify-self: stretch;

    display: grid;
    align-items: center;
    grid-template-columns: repeat(2, 1fr);
    gap: 5px;

    padding: 5px 5px;
    background-color: var(--custom-pink);
    border-radius: 15px;
    color: white
}

.dateAndStatusInfo>.statusInfo {
    justify-self: stretch;

    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    gap: 5px;

    background-color: white;
    color: black;

    border-radius: 10px;
    padding: 10px 5px;
}

.dateAndStatusInfo>.statusInfo>:first-child {
    font-weight: 700;
}

.dateAndStatusInfo>.dateInfo {
    padding: 5px 15px;
}

.agentInfo {
    justify-self: center;
}


/* @media (max-width: 1200px) {
    .listItem {
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    }
}

@media (max-width: 992px) {
    .container {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }
}

@media (max-width: 768px) {
    .container {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
}

@media (max-width: 576px) {
    .container {
        grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
    }
} */
</style>
