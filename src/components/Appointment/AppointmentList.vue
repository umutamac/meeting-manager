<template>
    <div class="container">
        <div class="filtersSection">
            <!-- agents -->
            <AgentAvatarList :agents="_agents" :l2r="false" :limit="5" />
            <!-- status -->
            <div>
                <v-select v-model="filter.status" :items="statusOptions" label="Status"></v-select>
            </div>
            <!-- dates -->
            <div>
                <v-menu :close-on-content-click="false" location="end">
                    <template v-slot:activator="{ props }">
                        <div v-bind="props">From: {{ formatDate(filter.from) }}</div>
                    </template>
                    <v-date-picker></v-date-picker>
                </v-menu>
            </div>
            <div>
                <v-menu :close-on-content-click="false" location="end">
                    <template v-slot:activator="{ props }">
                        <div v-bind="props">To: {{ formatDate(filter.to) }}</div>
                    </template>
                    <v-date-picker v-model="filter.to"></v-date-picker>
                </v-menu>
            </div>
            <!-- search -->
            <div style="display: flex; align-items: center; margin-left: auto;">
                <v-text-field v-model="filter.searchText" label="Search" style="min-width: 150px;"></v-text-field>
                <v-btn>ss</v-btn>
            </div>
        </div>
        <div class="listHeader">
            <div style="font-weight: 500;">{{ filteredAppointments.length }} appointments found</div>
            <div><v-btn @click="openAppointmentDialog">Create appointment +</v-btn></div>
        </div>

        <div class="list">
            <AppointmentListItem v-for="app, i in filteredAppointments" :key="`appointment_${i}`" :appointment="app" />
        </div>

    </div>
    <v-dialog v-model="appointmentDialog.open" persistent>
        <AppointmentForm :appointment="appointmentDialog.model" :contacts="_contacts" :agents="_agents" />
    </v-dialog>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import type { Agent, Appointment } from "../../types";
import { FILTER } from "../../utils";
//import { SERVICE } from "../../service";

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
const _contacts = ref<Agent.Model[]>([
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
        ],
        isCanceled: false
    },
    {
        firstName: "Amaç",
        surName: "Alptekin",
        email: "umut@testinvite.com",
        phone: "90 555 999 11 11",
        address: "123 Sunday Vista Street 12345",
        date: 1652361115000,
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
        ],
        isCanceled: false
    }
]);

const now = Date.now();

const filter = ref<{
    status: "" | "completed" | "upcoming" | "canceled",
    searchText: string,
    from: number,
    to: number,
    agents: any[]
}>({
    status: "",
    searchText: "",
    from: now - 7 * 24 * 60 * 60 * 1000,
    to: now + 7 * 24 * 60 * 60 * 1000,
    agents: []
})
const statusOptions: { title: string, value: "" | "completed" | "upcoming" | "canceled" }[] = [
    { title: "All Statuses", value: "" },
    { title: "Completed", value: "completed" },
    { title: "Upcoming", value: "upcoming" },
    { title: "Canceled", value: "canceled" },
];

const appointmentDialog = ref<{ open: boolean, model: any }>({ open: false, model: null });

function openAppointmentDialog(model?: any) {
    if (model) appointmentDialog.value.model = model;
    appointmentDialog.value.open = true;
}
// function closeAppointmentDialog() {
//     appointmentDialog.value.open = false;
// }

// function filterChanged() {
//     console.log("filter changed");
// }

// const fetchAppointments = async (offset: number) => {
//     const _appointments = await SERVICE.Appointment.fetch(offset);

//     // console.log("fetchAppointments resp", records);
//     console.log("appointments", _appointments);

//     //_appointments.value = appointments;
// }

// const fetchAgents = async () => {
//     const resp = await SERVICE.Agent.fetch();
//     console.log("fetchAgents resp", resp);
//     //agents.value = resp
// }

// const init = async () => {
//     await Promise.all([fetchAppointments(0), fetchAgents()]);
// }
const filteredAppointments = computed(() => {
    const filtered = [...appointments.value].filter(a => {
        const conditions: boolean[] = [a.date < filter.value.from, a.date > filter.value.to];
        switch (filter.value.status) {
            case "completed":
                conditions.push(a.date < Date.now() && !a.isCanceled)
                break;
            case "upcoming":
                conditions.push(a.date > Date.now() && !a.isCanceled)
                break;
            case "canceled":
                conditions.push(a.isCanceled)
                break;
            default:
                break;
        }

        if (filter.value.searchText) {
            const searchIn = a.address + a.firstName + a.surName + a.email + a.phone;
            conditions.push(searchIn.includes(filter.value.searchText));
        }
        console.log(conditions);
        return conditions.every(c => c);
    })

    return filtered;
})

const formatDate = FILTER.formatDate

// onMounted(() => {
//     //init();
// })
</script>

<style scoped>
.container {
    background-color: beige;
}

.filtersSection {
    display: flex;
    align-items: center;
    gap: 20px;
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
