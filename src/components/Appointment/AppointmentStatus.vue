<template>
    <div class="dateAndStatusInfo">
        <div class="statusInfo">
            <div :style="{ color: status.color }">{{ status.kind }}</div>
            <div v-if="status.kind == 'Upcoming'">{{ status.remainingDays }} days</div>
        </div>
        <div class="dateInfo">
            <v-icon class="mr-1">mdi-clock-time-five-outline</v-icon>
            <span>{{ formatDateTime(appointment.date) }}</span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineProps, computed } from "vue";
import type { Appointment } from "../../types";
import { COMMON, APPOINTMENT } from "../../utils";

type Props = {
    appointment: Appointment.Model
};
const props = defineProps<Props>();

const status = computed<Appointment.Status>(() => {
    return APPOINTMENT.getStatus(props.appointment);
})

const formatDateTime = COMMON.Dates.formatDateTime;

</script>

<style scoped>
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
</style>
