<template>
    <div class="listItem">
        <div>
            <div>{{ appointment.contact.name }}</div>
            <div>{{ appointment.contact.email }}</div>
            <div>{{ appointment.contact.phone }}</div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, defineProps } from "vue";
import type { Appointment } from "../types";
import { APPOINTMENT } from "../utils";

type Props = { _appointment: Appointment.Model };

const props = defineProps<Props>();

const appointment = ref<Appointment.Model>(APPOINTMENT.build());

onMounted(() => {
    appointment.value = props._appointment
})
</script>

<style scoped>
.listItem {
    display: flex;
    align-items: center;
    border-radius: 5px;
}
</style>
