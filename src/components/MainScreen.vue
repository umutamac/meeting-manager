<template>
    <div class="container">
        <div class="filtersSection">
            <!-- agents -->
            <AgentAvatarList :agents="_agents" :l2r="false" :limit="3" />
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
            <AppointmentListItem v-for="app, i in filteredAppointments" :key="`appointment_${i}`" :appointment="app" />
        </div>

    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import type { Agent, Appointment } from "../types";
//import { APPOINTMENT } from "../utils";
import { SERVICE } from "../service";

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
    },
    {
        firstName: "Ayşe",
        lastName: "Alptekin",
        color: "pink"
    },
    {
        firstName: "Nurettin",
        lastName: "Alptekin",
        color: "beige"
    }
])

const appointments = ref<Appointment.Model[]>([
    {
        firstName: "Umut",
        surName: "Alptekin",
        email: "umut@testinvite.com",
        phone: "90 555 444 11 22",
        address: "55 South Western Terrace, Michigan 11111",
        date: 1625140800000,
        agents: [
            {
                firstName: "Aysun",
                lastName: "Alptekin",
                color: "red"
            },
            {
                firstName: "Nuri",
                lastName: "Alptekin",
                color: "blue"
            }
        ]
    },
    {
        firstName: "Amaç",
        surName: "Alptekin",
        email: "umut@testinvite.com",
        phone: "90 555 999 11 11",
        address: "123 Sunday Vista Street 12345",
        date: 1752361115000,
        agents: [
            {
                firstName: "Berat",
                lastName: "Alptekin",
                color: "pink"
            },
            {
                firstName: "Nuri",
                lastName: "Alptekin",
                color: "blue"
            },
            {
                firstName: "Nurettin",
                lastName: "Alptekin",
                color: "teal"
            },
            {
                firstName: "Nurettin",
                lastName: "Alptekin",
                color: "beige"
            }
        ]
    }
]);


// const _filter = ref({
//     searchText: "",
//     dates: {
//         from: Date.now(),
//         to: Date.now() + 7 * 24 * 60 * 60 * 1000
//     },
//     agents: []
// })

const fetchAppointments = async (offset: number) => {
    const _appointments = await SERVICE.Appointment.fetch(offset);

    // console.log("fetchAppointments resp", records);
    console.log("appointments", _appointments);

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
    return appointments.value;
    //const filtered = appointments.value.filter(a => APPOINTMENT.filter(a, _filter.value.searchText, _filter.value.dates));
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

.list>div {
    border: 1px black solid;
    border-radius: 5px;
    margin-bottom: 5px;
}

.list> :nth-child(odd) {
    background-color: aquamarine;
}
</style>
