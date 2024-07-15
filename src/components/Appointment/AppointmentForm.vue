<template>
    <v-card style="height: 800px;">
        <v-card-title style="text-align: center;">{{ mode }} an Appointment</v-card-title>
        <v-card-item>
            <!-- search -->
            <div>
                <v-autocomplete v-model="form.contactId" :items="contactOptions"
                    label="Choose contact"></v-autocomplete>
            </div>
            <!-- address -->
            <div>
                <v-text-field v-model="form.address" label="Address" clearable></v-text-field>
            </div>
            <!-- agent -->
            <div>
                <v-select v-model="form.agentIds" :items="agentOptions" multiple label="Choose Agent(s)"></v-select>
            </div>
            <!-- date -->
            <div>
                <!-- <v-date-picker v-model="form.date" label="Date date"></v-date-picker> -->
            </div>
            <div v-if="mode == 'edit'">
                <v-select v-model="form.isCanceled" :items="statusOptions" @change="statusChanged"
                    label="Status"></v-select>
            </div>
            <div class="mt-4">
                <div>Related Appointments: {{ otherAppointmentsForContact.length }}</div>
                <AppointmentListItem v-for="a, i in otherAppointmentsForContact" :key="`app_${i}`" :agents="[]"
                    :contacts="[]"></AppointmentListItem>
            </div>
            <div class="debug">props.appointment {{ JSON.stringify(appointment) }}</div>
            <div class="debug">form {{ form }}</div>
        </v-card-item>
        <v-card-actions class="mt-auto">
            <div class="mt-auto"
                style="display: flex; align-items: center; gap: 10px; justify-content: end;justify-self: end;">
                <v-btn color="black" @click="cancel">Cancel</v-btn>
                <v-btn color="hotPink" @click="save">{{ mode == "Create" ? mode : "Save" }}</v-btn>
            </div>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts" setup>
import { defineProps, ref, reactive, computed, watch, defineEmits } from "vue";
import type { Agent, Appointment, Contact, Vuetify } from "../../types"

type Props = {
    appointment?: Appointment.Model | undefined;
    contacts: Contact.Model[]
    agents: Agent.Model[]
    appointments: Appointment.Model[];
}
const props = defineProps<Props>()

/* eslint-disable no-unused-vars */
type Emit = {
    (e: "update:model-value", value: Appointment.Model): void;
    (e: "cancel", value: void): void;
};
const emit = defineEmits<Emit>();
/* eslint-enable no-unused-vars */


const mode = ref<"Create" | "Edit">("Create");

const form = reactive<{
    address: string,
    contactId: string,
    agentIds: string[],
    date: number
    isCanceled: boolean
}>({
    address: "",
    contactId: "",
    agentIds: [],
    date: Date.now(),
    isCanceled: false
});

function cancel() {
    emit("cancel");
}
function save() {
    console.log("save");
    emit("cancel");
}

function statusChanged(event: any) {
    console.log("statusChanged", event)
}

const statusOptions: Vuetify.SelectOption<boolean>[] = [{
    title: Date.now() > form.date ? "Complted" : "Upcoming",
    value: false
}, {
    title: "Cancelled",
    value: true
}]



const agentOptions = computed<Vuetify.SelectOption<string>[]>(() => {
    return props.agents.map(a => {
        return {
            title: `${a.name} ${a.surname}`,
            value: a.record_id
        }
    })
})

const contactOptions = computed<Vuetify.SelectOption<string>[]>(() => {
    return props.contacts.map(c => {
        return {
            title: `${c.name} ${c.surname}`,
            value: c.record_id
        }
    })
})

const otherAppointmentsForContact = computed(() => {
    const currectContact = props.contacts.find(c => c.id == form.contactId);
    if (!currectContact || !props.appointment) return [];
    return props.appointments.filter(a => a.contact.includes(form.contactId))
})

watch(() => props.appointment,
    (newValue: Appointment.Model | undefined) => {
        console.log("watch: newValue", newValue);
        if (newValue) {
            mode.value = "Edit";
            form.address = newValue.address;
            form.agentIds = newValue.agent;
            //form.date = newValue.date
            form.contactId = newValue.contact ? newValue.contact[0] : ""
            form.isCanceled = newValue.isCanceled
        }

    },
    { immediate: true, deep: true }
)

</script>

<style scoped></style>
