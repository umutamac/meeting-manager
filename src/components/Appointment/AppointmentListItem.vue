<template>
    <div class="listItem">
        <div class="info">
            <div class="contactInfo" v-if="showContactInfo">
                <template v-if="contacts[0]">
                    <div><v-icon>mdi-account</v-icon> <span>{{ contacts[0].name }} {{ contacts[0].surname }}</span>
                    </div>
                    <div><v-icon class="mr-1">mdi-email</v-icon> <span>{{ contacts[0].email }}</span></div>
                    <div><v-icon class="mr-1">mdi-phone</v-icon> <span>{{ contacts[0].phone }}</span></div>
                    <!-- <div class="debug">id {{ _appointment.id }}</div> -->
                </template>
                <div v-else>No contact information</div>
            </div>
            <div class="addressInfo">
                <v-icon class="mr-1">mdi-home</v-icon>
                <div>{{ maxString(_appointment.address, 35) }}</div>
            </div>
            <AppointmentStatus :appointment="_appointment" />
        </div>

        <AgentAvatarList class="agentInfo" :agents="agentsForAppointment" :l2r="true"
            :limit="$vuetify.display.smAndUp ? 3 : 1" />
    </div>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults, ref, computed, watch } from "vue";
import type { Appointment, Agent, Contact } from "../../types";
import { FILTER } from "../../utils";

type Props = {
    appointment: Appointment.Model
    agents: Agent.Model[],
    contacts: Contact.Model[],
    showContactInfo?: boolean
};
const props = withDefaults(defineProps<Props>(), { showContactInfo: true });

const _appointment = ref<Appointment.Model>(props.appointment);

const agentsForAppointment = computed(() => {
    const agentList = [...props.agents].filter(agent => agent.appointments.includes(_appointment.value.record_id));
    return agentList;
})

const maxString = FILTER.truncateString;

watch(() => props.appointment,
    (newValue: Appointment.Model) => {
        _appointment.value = newValue;
    },
    { immediate: true, deep: true }
)

</script>

<style scoped>
.listItem {
    display: grid;
    grid-template-columns: 6fr 1fr;
    align-items: center;
    gap: 10px;
    padding: 10px 40px;
    margin-bottom: 5px;
    border: 1px black solid;
    border-radius: 5px;

    cursor: pointer;

}

.listItem:hover {
    background-color: #add8e6;
    /* Slightly darker shade of lightblue */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    /* Add shadow on hover */
}

.info {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    align-items: center;
    justify-items: center;
    gap: 10px;
    /* padding: 10px 40px; */
}

.contactInfo {
    justify-self: start;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.contactInfo> :first-child {
    font-weight: 700;
}

.contactInfo> :not(:first-child) {
    font-size: smaller;
}

.addressInfo {
    justify-self: stretch;
    display: flex;
    align-items: center;

    font-weight: 700;
    /* max-width: 400px; */
}

.addressInfo>:nth-child(2) {
    word-wrap: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
}


.agentInfo {
    justify-self: center;
}

@media screen and (max-width: 600px) {
    .listItem {
        padding: 10px 20px;
    }
}
</style>
