<template>
    <div class="container">
        <div class="filtersSection">
            <!-- agents -->
            <AgentAvatarList :agents="_agents" :l2r="true" :limit="3"/>
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
            <ListItem />

            <div v-for="a, i in filteredAppointments" :key="`app_${i}`">
                <ListItem />
            </div>
        </div>

    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import type { Agent } from "../types";
//import { APPOINTMENT } from "../utils";
import { SERVICE } from "../service";


//const _appointments = ref<any[]>([]);
const _agents = ref<Agent.Model[]>([
    {
        firstName: "Aysun",
        lastName: "Alptekin",
        color: "red"
    },
    {
        firstName: "Nuri",
        lastName: "Alptekin",
        color: "blue"
    },
    {
        firstName: "Berat",
        lastName: "Alptekin",
        color: "green"
    }
])

// const _filter = ref({
//     searchText: "",
//     dates: {
//         from: Date.now(),
//         to: Date.now() + 7 * 24 * 60 * 60 * 1000
//     },
//     agents: []
// })

const fetchAppointments = async (offset: number) => {
    const appointments = await SERVICE.Appointment.fetch(offset);
    
    // console.log("fetchAppointments resp", records);
    console.log("appointments", appointments);

    //_appointments.value = appointments;
}

const fetchAgents = async () => {
    const resp = await SERVICE.Agent.fetch();
    console.log("fetchAgents resp", resp);
    //agents.value = resp
}

const init = async () => {
    await Promise.all([fetchAppointments(0), fetchAgents()]);
}
const filteredAppointments = computed(() => {
    // const filtered = _appointments.value.filter(a => APPOINTMENT.filter(a, _filter.value.searchText, _filter.value.dates));
    return [];
})

onMounted(() => {
    init();
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
