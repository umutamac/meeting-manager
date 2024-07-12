<template>
    <div class="listItem">
        <div class="contactInfo">
            <div>{{ appointmentDemo.firstName }} {{ appointmentDemo.surName }}</div>
            <div>{{ appointmentDemo.email }}</div>
            <div>{{ appointmentDemo.phone }}</div>
        </div>
        <div class="addressInfo">
            <div>{{ appointmentDemo.address }}</div>
        </div>
        <div class="dateInfo">
            <div class="status">
                <div :style="{ color: status.color }">{{ status.kind }}</div>
                <div v-if="status.kind == 'Upcoming'">{{ status.remainingDays }}</div>
            </div>
            <div>{{ formatDate(appointmentDemo.date) }}</div>
        </div>
        <AgentAvatarList :agents="appointmentDemo.agents" :l2r="true" :limit="3" />
    </div>
</template>

<script lang="ts" setup>
import { /*ref,*/ computed, onMounted } from "vue";
import { COMMON } from "../../utils";

//type Props = { _appointment?: any };

//const props = defineProps<Props>();


//const appointment = ref<any>(null);
const appointmentDemo = {
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
}


const status = computed<{ kind: "Completed", color: string } | { kind: "Upcoming", color: string, remainingDays: number } | { kind: "Canceled", color: string }>(() => {
    const kind = Date.now() > appointmentDemo.date ? "Completed" : "Upcoming";
    const remainingDays = COMMON.getDaysBetweenTimestamps(Date.now(), appointmentDemo.date);
    return kind == "Completed" ? { kind, color: "green" } : { kind, color: "orange", remainingDays };
})

const formatDate = COMMON.formatDate

onMounted(() => {
    //appointment.value = COMMON.deepCopy(props._appointment);
})
</script>

<style scoped>
.listItem {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 5px;
}

.contactInfo {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.contactInfo> :first-child {
    font-weight: 700;
}

.addressInfo {
    font-weight: 700;

}

.dateInfo {
    display: grid;
    align-items: center;
    justify-content: space-between;
    grid-template-columns: repeat(2, auto);
    gap: 10px;
    padding: 15px;


    background-color: pink;
    border-radius: 15px;
    color: white
}

.dateInfo>.status {
    background-color: white;
    color: black;

    border-radius: 10px;
    padding: 15px;

}

.dateInfo>.status>:first-child {
    font-weight: 700;
}
</style>
