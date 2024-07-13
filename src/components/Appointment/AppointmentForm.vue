<template>
    <div class="formContainer">
        <div>{{ title }}</div>
        <!-- search -->
        <div></div>
        <!-- address -->
        <div>
            <v-text-field v-model="form.address" label="Address"></v-text-field>
        </div>
        <!-- agent -->
        <div>
            <v-select multiple v-model="form.agents" :items="agents" label="Agent"></v-select>
        </div>
        <!-- date -->
        <div>
            <v-date-picker v-model="form.date" label="Date date"></v-date-picker>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineProps, ref, computed } from "vue";
//import { APPOINTMENT } from "../utils";


//const _appointments = ref<any[]>([]);

type Props = {
    appointment?: any;
    contacts: any[]
    agents: any[]
}
const props = defineProps<Props>()

const form = ref<any>({
    address: "",
    agents: [],
    date: Date.now()
});
//const appointment =
// const fetchAgents = async () => {
//     const resp = await SERVICE.Agent.fetch();
//     console.log("fetchAgents resp", resp);
//     //agents.value = resp
// }

// const init = async () => {
//     //await Promise.all([fetchAppointments(0), fetchAgents()]);
// }
const agents = computed<{ title: string, value: number }[]>(() => {
    return [{ title: "Berat Alptekin", value: 12 }]
});

const title = computed<string>(() => {
    const action = props.appointment ? "Edit" : "Add";
    return `${action} an Appointment`;
});


// onMounted(() => {
//     //init();
// });
</script>

<style scoped>
.formContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>
