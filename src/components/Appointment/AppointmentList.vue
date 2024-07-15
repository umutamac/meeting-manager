<template>
    <div class="container">
        <div class="filters">
            <!-- agents -->
            <AgentAvatarList :agents="agents" :l2r="false" :limit="5" />
            <!-- status -->
            <div>
                <v-select v-model="filter.status" :items="statusOptions" label="Status" hide-details></v-select>
            </div>
            <!-- dates -->
            <div style="display: flex; align-items: center">
                <DatePicker :ts="filter.from" label="From"></DatePicker>
                <!-- <v-menu :close-on-content-click="false" location="end">
                    <template v-slot:activator="{ props }">
                        <div v-bind="props">From: {{ formatDate(filter.from) }}</div>
                    </template>
<v-date-picker></v-date-picker>
</v-menu> -->
                <DatePicker :ts="filter.to" label="To"></DatePicker>

                <!-- <v-menu :close-on-content-click="false" location="end">
                    <template v-slot:activator="{ props }">
                        <div v-bind="props">To: {{ formatDate(filter.to) }}</div>
                    </template>
                    <v-date-picker v-model="filter.to"></v-date-picker>
                </v-menu> -->
            </div>

            <!-- search -->
            <div style="display: flex; align-items: center; margin-left: auto;">
                <v-text-field v-model="filter.searchText" label="Search" style="min-width: 150px;" hide-details></v-text-field>
                <!-- <v-btn >ss</v-btn> -->
            </div>
        </div>
        <div class="listHeader">
            <div style="font-weight: 600;">{{ filteredAppointments.length }} appointments found</div>
            <div><v-btn @click="openAppointmentDialog">Create appointment +</v-btn></div>
        </div>

        <div class="list">
            <AppointmentListItem v-for="app, i in filteredAppointments" :key="`appointment_${i}`" :appointment="app" :agents="agents"/>
        </div>

    </div>
    <v-dialog v-model="appointmentDialog.open" persistent>
        <AppointmentForm :appointment="appointmentDialog.model" :contacts="contacts" :agents="agents" />
    </v-dialog>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import type { Agent, Appointment, Contact } from "../../types";
import { COMMON } from "../../utils";
import { SERVICE } from "../../service";
import { useStore } from "vuex";
import { State } from "@/store";

const store = useStore<State>();

const agents = ref<Agent.Model[]>([]);
const contacts = ref<Contact.Model[]>([]);
const appointments = ref<Appointment.Model[]>([]);

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
    from: now - COMMON.Dates.getMS(1, "year"),
    to: now + COMMON.Dates.getMS(1, "year"),
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

async function fetchAppointments(offset: number) {
    const resp = await SERVICE.Appointment.fetch(offset);
    console.log("appointments", resp);
    appointments.value = resp;
}

async function fetchAgents() {
    const resp = await SERVICE.Agent.fetch();
    agents.value = resp;
}

async function fetchContacts() {
    const resp = await SERVICE.Contact.fetchAll();
    contacts.value = resp;
}

async function init() {
    try {
        //console.log("store.state", store.state)
        store.dispatch('SET_LOADING', true);
        //console.log("store.state", store.state)

        await Promise.all([fetchAppointments(0), fetchAgents(), fetchContacts()]);
        console.log("agents fetched", agents.value);
        console.log("contacts fetched", contacts.value);
        console.log("appointments fetched", appointments.value);
    } catch (err) {
        console.error("init err", err)
    } finally {
        store.dispatch('SET_LOADING', false);
        //console.log("store.state", store.state)
    }

}

const filteredAppointments = computed(() => {
    const filtered = [...appointments.value].filter(a => {
        const appointmentDateInTS = new Date(a.date).getTime();
        const now = Date.now();
        const conditions: boolean[] = [appointmentDateInTS > filter.value.from, appointmentDateInTS < filter.value.to];
        switch (filter.value.status) {
            case "completed":
                conditions.push(appointmentDateInTS < now && !a.isCanceled)
                break;
            case "upcoming":
                conditions.push(appointmentDateInTS > now && !a.isCanceled)
                break;
            case "canceled":
                conditions.push(a.isCanceled)
                break;
            default:
                break;
        }

        if (filter.value.searchText) {
            const searchIn = a.address + a.contact.map(c => c.name + c.surname + c.email + String(c.phone));
            conditions.push(searchIn.includes(filter.value.searchText));
        }
        console.log("id", a.id, "conditions", conditions);
        return conditions.every(c => c);
    })

    return filtered;
})

onMounted(() => {
    init();
})
</script>

<style scoped>
.container {
    /*background-color: beige;*/
}

.filters {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
    margin: 0px 20px;
    padding: 20px 0px;
    border-bottom: 2px solid black;
}

.listHeader {
    display: flex;
    align-items: center;
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
