<template>
    <v-card class="formContainer">
        <v-card-title class="formTitle">
            <v-icon>mdi-calendar-blank</v-icon> {{ mode }} an Appointment
        </v-card-title>
        <v-card-item>
            <v-form ref="formRef" class="appointmentForm mb-7" v-model="form.valid" lazy-validation @submit.prevent>
                <!-- contact search -->
                <div>
                    <v-autocomplete v-model="form.data.contactId" :items="contactOptions" :rules="rules.required"
                        label="Choose contact" bg-color="white"></v-autocomplete>
                </div>
                <!-- address -->
                <div>
                    <v-text-field v-model="form.data.address" :rules="rules.required" label="Address" clearable
                        bg-color="white"></v-text-field>
                </div>
                <!-- agent -->
                <div>
                    <v-select v-model="form.data.agentIds" :items="agentOptions" multiple :rules="rules.required"
                        label="Choose Agent(s)" bg-color="white"></v-select>
                </div>
                <!-- date -->
                <div>
                    <DatePicker :modelValue="form.data.date" label="Choose Date" @date-changed="dateChanged($event)" />
                </div>
                <div v-if="mode == 'edit'">
                    <v-select v-model="form.data.isCancelled" :items="statusOptions" @change="statusChanged"
                        label="Status" bg-color="white"></v-select>
                </div>
            </v-form>
            <!-- <div class="debug my-4">
                <div>props.appointment {{ JSON.stringify(appointment) }}</div>
                <div>form {{ form }}</div>
            </div> -->
            <div>
                <div style="font-weight: 600;">Related Appointments: {{ otherAppointmentsForContact.length }}</div>
                <div class="appointmentList">
                    <AppointmentListItem v-for="app, i in otherAppointmentsForContact" :key="`app_${i}`"
                        :appointment="app" :agents="agents" :contacts="[]" :showContactInfo="false" />
                </div>
            </div>

        </v-card-item>
        <v-card-actions class="mt-auto">
            <v-btn color="black" @click="cancel">Cancel</v-btn>
            <v-btn color="hotPink" @click="save">{{ mode == "Create" ? mode : "Save" }}</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts" setup>
import { defineProps, ref, reactive, computed, watch, defineEmits } from "vue";
import type { Agent, Appointment, Contact, Vuetify, Validation } from "../../types";
import { VALIDATOR } from "../../utils";
import type { VForm } from "vuetify/components";

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

const rules: Validation.Rules = {
    required: [VALIDATOR.required]
}

const mode = ref<"Create" | "Edit">("Create");

const formRef = ref<VForm | null>(null);

type Form = {
    valid: boolean | null,
    data: {
        address: string,
        contactId: string,
        agentIds: string[],
        date: string
        isCancelled: boolean
    }
}
const form = reactive<Form>({
    valid: null,
    data: {
        address: "",
        contactId: "",
        agentIds: [],
        date: new Date().toISOString(),
        isCancelled: false
    }
});

function cancel() {
    emit("cancel");
}
async function isFormValid(): Promise<boolean> {
    if (!formRef.value) return false;
    const validation = await formRef.value.validate();
    return validation.valid;
}
async function save() {
    if (!await isFormValid()) {
        console.log("form not valid");
        return;
    }

    const newAppointment: Appointment.Model = {
        address: form.data.address,
        contact: [form.data.contactId],
        agent: form.data.agentIds,
        date: form.data.date,
        isCancelled: form.data.isCancelled,
        id: props.appointment ? props.appointment.id : "",
        record_id: props.appointment ? props.appointment.record_id : "",
    }
    emit("update:model-value", newAppointment);
}

function statusChanged(event: any) {
    console.log("statusChanged", event)
}

function dateChanged(date: string) {
    form.data.date = date;
}

const statusOptions: Vuetify.SelectOption<boolean>[] = [{
    title: new Date(Date.now()) > new Date(form.data.date) ? "Completed" : "Upcoming",
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

const otherAppointmentsForContact = computed<Appointment.Model[]>(() => {
    const currectContact = props.contacts.find(c => c.record_id == form.data.contactId);
    if (!currectContact) {
        //console.log("no currect contact")
        return [];
    }
    //console.log("currentContact record id", currectContact.record_id, "id", currectContact.id)
    const otherApps = props.appointments.filter(a => a.contact.includes(form.data.contactId));
    return otherApps
})

watch(() => props.appointment,
    (newValue: Appointment.Model | undefined) => {
        //console.log("watch: newValue", newValue);
        if (newValue) {
            mode.value = "Edit";
            form.data.address = newValue.address;
            form.data.agentIds = newValue.agent;
            form.data.date = newValue.date;
            form.data.contactId = newValue.contact ? newValue.contact[0] : "";
            form.data.isCancelled = newValue.isCancelled;
        }

    },
    { immediate: true, deep: true }
)
</script>

<style scoped>
.formContainer {
    background-color: var(--custom-gray);
}

.formTitle {
    text-align: center;
    font-weight: 600;
}

.appointmentForm>* {
    margin-bottom: 10px
}

.appointmentList>* {
    background-color: white;
    margin-bottom: 10px;
}
</style>
