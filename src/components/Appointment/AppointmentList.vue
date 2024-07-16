<template>
    <div class="main">
        <div class="filters">
            <!-- agents -->
            <SelectAgents class="agentFilter" :agents="agents" :modelValue="filter.agents"
                @update:model-value="filter.agents = $event" />
            <!-- status -->
            <div class="statusFilter">
                <v-select v-model="filter.status" :items="statusOptions" label="Status" hide-details></v-select>
            </div>
            <!-- dates -->
            <div class="dateFilter">
                <DatePicker :model-value="filter.from" ref="fromRef" label="From"
                    @date-changed="dateChanged('from', $event)" :disable-after="filter.to" class="mr-2" />
                <DatePicker :model-value="filter.to" ref="toRef" label="To" @date-changed="dateChanged('to', $event)"
                    :disable-before="filter.from" />
            </div>

            <!-- search -->
            <div class="searchFilter">
                <v-text-field v-model="filter.searchText" label="Search" hide-details></v-text-field>
            </div>
        </div>
        <div class="listHeader">
            <div style="font-weight: 600;">{{ filteredAppointmentList.length }} appointments found
                <!-- <div class="debug"> from {{ filter.from }} - to {{ filter.to }}</div> -->
            </div>

            <div><v-btn color="hotPink" @click="openAppointmentDialog()"> + <template
                        v-if="$vuetify.display.smAndUp">Create
                        appointment</template></v-btn></div>
        </div>

        <div class="list">
            <AppointmentListItem v-for="listItem, i in appointmentsToList" :key="`appointment_${i}`"
                :appointment="listItem.appointment" :agents="listItem.agents" :contacts="listItem.contacts" />
        </div>
        <BottomPagination :pageSize="pagination.pageSize" :totalLength="filteredAppointmentList.length"
            :isLast="filteredAppointmentList.length < pagination.pageSize" @paginate="paginate($event.offset)" />
    </div>

    <v-dialog v-model="appointmentDialog.open" persistent max-width="600px">
        <template v-if="appointmentDialog.model">
            <AppointmentForm :appointment="appointmentDialog.model" :contacts="contacts" :agents="agents"
                :appointments="appointments" @cancel="closeAppointmentDialog" @update:model-value="saveAppointment" />
        </template>
        <template v-else>
            <AppointmentForm :contacts="contacts" :agents="agents" :appointments="appointments"
                @cancel="closeAppointmentDialog" @update:model-value="saveAppointment" />
        </template>
    </v-dialog>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import type { Agent, Appointment, Contact, Vuetify } from "../../types";
import { COMMON } from "../../utils";
import { SERVICE } from "../../service";
import { useStore } from "vuex";
import { State } from "@/store";

const store = useStore<State>();

const agents = ref<Agent.Model[]>([]);
const contacts = ref<Contact.Model[]>([]);
const appointments = ref<Appointment.Model[]>([]);

type Status = "" | "completed" | "upcoming" | "cancelled";

const filter = ref<{
    status: Status,
    searchText: string,
    from: string,
    to: string,
    agents: string[]
}>({
    status: "",
    searchText: "",
    from: COMMON.Dates.getISOStringFromTimestamp(Date.now() - COMMON.Dates.getMS(1, "year")),
    to: COMMON.Dates.getISOStringFromTimestamp(Date.now() + COMMON.Dates.getMS(1, "year")),
    agents: []
})
const statusOptions: Vuetify.SelectOption<Status>[] = [
    { title: "All Statuses", value: "" },
    { title: "Completed", value: "completed" },
    { title: "Upcoming", value: "upcoming" },
    { title: "Cancelled", value: "cancelled" },
];

const pagination = ref<{ pageSize: number, offset: number }>({ pageSize: 10, offset: 0 });

const appointmentDialog = ref<{ open: boolean, model?: Appointment.Model }>({ open: false, model: undefined });

function paginate(offset: number) {
    pagination.value.offset = offset;
    //console.log("pagination", pagination.value);
}
function dateChanged(origin: "to" | "from", date: string) {
    console.log("dateChanged")
    filter.value[origin] = date;

}
function openAppointmentDialog(model?: Appointment.Model) {
    if (model) appointmentDialog.value.model = model;
    appointmentDialog.value.open = true;
}
function closeAppointmentDialog() {
    appointmentDialog.value = { open: false, model: undefined };
}

async function saveAppointment(model: Appointment.Model) {
    try {
        console.log("saveAppointment model", model);
        if (!appointmentDialog.value.open) return;

        store.dispatch('SET_LOADING', true);

        if (appointmentDialog.value.model) {
            console.log("updating appt", appointmentDialog.value.model.record_id);
            //await SERVICE.Appointment.updateRecord(model);
        } else {
            console.log("creating appt");
            await SERVICE.Appointment.createRecord(model);
        }

        await fetchAppointments(); // temp fix
        // TODO: insert new appt to appointments.value manually

        closeAppointmentDialog();
    } catch (err) {
        console.error(err)
    } finally {
        store.dispatch('SET_LOADING', false);
    }

}

async function fetchAppointments() {
    const resp = await SERVICE.Appointment.fetchAll();
    //console.log("appointments", resp);
    appointments.value = resp;
}

async function fetchAgents() {
    const resp = await SERVICE.Agent.fetchAll();
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

        await Promise.all([fetchAppointments(), fetchAgents(), fetchContacts()]);
        // console.log("agents fetched", agents.value);
        // console.log("contacts fetched", contacts.value);
        // console.log("appointments fetched", appointments.value);
    } catch (err) {
        console.error("init err", err)
    } finally {
        store.dispatch('SET_LOADING', false);
        //console.log("store.state", store.state)
    }

}

const filteredAppointmentList = computed(() => {
    const list = [...appointments.value].map(a => {
        return {
            appointment: a,
            agents: agents.value.filter(agent => a.agent?.includes(String(agent.record_id))),
            contacts: contacts.value.filter(c => a.contact?.includes(String(c.record_id)))
        }
    });
    const filtered = list.filter(item => {
        /*
            filter by:
            - dates DONE
            - status DONE
            - agents
            - search DONE
        */
        const now = Date.now();
        const appointmentDateInTS = new Date(item.appointment.date).getTime();
        const conditions: boolean[] = [appointmentDateInTS > new Date(filter.value.from).getTime(), appointmentDateInTS < new Date(filter.value.to).getTime()];
        switch (filter.value.status) {
            case "completed":
                conditions.push(appointmentDateInTS < now && !item.appointment.isCancelled)
                break;
            case "upcoming":
                conditions.push(appointmentDateInTS > now && !item.appointment.isCancelled)
                break;
            case "cancelled":
                conditions.push(item.appointment.isCancelled)
                break;
            default:
                break;
        }

        if (filter.value.agents.length > 0) {
            if (typeof item.appointment.agent !== "object") console.log("agent", item.appointment.agent)
            conditions.push(item.appointment.agent ? filter.value.agents.every(agent => item.appointment.agent.includes(agent)) : false);
        }

        if (filter.value.searchText) {
            const contactsSearchText = item.contacts.map(c => c.name + c.surname + c.email + String(c.phone)).join(" ");
            const searchIn = (item.appointment.address + contactsSearchText).toLowerCase();
            conditions.push(searchIn.includes(filter.value.searchText.toLowerCase()));
        }
        //console.log("id", a.id, "conditions", conditions);
        return conditions.every(c => c);
    })

    return filtered;
})

const appointmentsToList = computed(() => {
    return filteredAppointmentList.value.slice(pagination.value.offset, pagination.value.offset + pagination.value.pageSize);
})

onMounted(() => {
    init();
})
</script>

<style scoped>
.main {
    padding: 20px;
}

.filters {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
    padding: 20px 0px;
    border-bottom: 2px solid black;
}

.agentFilter {
    width: 200px
}

.statusFilter {
    width: 200px
}

.dateFilter {
    width: 500px;
    display: flex;
    align-items: center;
}

/* .dateFilter>* {
    

} */

.searchFilter {
    display: flex;
    align-items: center;
    margin-left: auto;
    width: 300px;
}

.listHeader {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 20px 0px;
    border-bottom: 2px solid gray;
}

.list {
    padding: 20px 0px;
}

.list> :nth-child(odd) {
    background-color: var(--custom-gray);
}

.pagination {
    display: flex;
    align-items: center;
    justify-content: end;
    gap: 5px;
    padding: 20px 0px;

}
</style>
