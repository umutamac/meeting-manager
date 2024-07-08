<template>
    <div class="container">
        <div class="filtersSection">
            <!-- agents -->
            <div style="display: flex;">
                <div v-for="agent, i in agents" :key="`agent_${i}`">{{ agent }}</div>
            </div>
            <!-- status -->
            <div></div>
            <!-- dates -->
            <div></div>
            <div></div>
            <!-- search -->
            <div></div>
        </div>
        <div class="listHeader">
            <div style="font-weight: 500;">{{ filteredAppointments.length }} appointments found</div>
            <div><button>Create appointment +</button></div>
        </div>

        <div class="list">
            <div v-for="a, i in filteredAppointments" :key="`app_${i}`">
                <ListItem />
            </div>
        </div>

    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
//import type { Appointment } from "../types";
import { APPOINTMENT } from "../utils";

const appointments = ref([]);

const agents = ref(["aa", "bb"])

const filter = ref({
    searchText: "",
    dates: {
        from: Date.now(),
        to: Date.now() + 7 * 24 * 60 * 60 * 1000
    },
    agents: []
})

const filteredAppointments = computed(() => {
    const filtered = appointments.value.filter(a => APPOINTMENT.filter(a, filter.value.searchText, filter.value.dates));
    return filtered;
})

onMounted(() => {
    // fetch appointments
})
</script>

<style scoped>
.container {
    background-color: beige;
}

.filtersSection {
    display: flex;
    align-items: center;
    margin: 0px 20px;
    padding: 20px 0px;
    border-bottom: 2px solid black;
}

.listHeader {
    display: flex;
    justify-content: space-between;
    margin: 0px 20px;
    padding: 20px 0px;
    border-bottom: 2px solid gray;
}

.list {
    padding: 20px;
}
</style>
