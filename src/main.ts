import { createApp } from "vue"
import App from "./App.vue"
import MainScreen from "./components/MainScreen.vue";
import AgentAvatar from "./components/Agent/AgentAvatar.vue";
import AgentAvatarList from "./components/Agent/AgentAvatarList.vue";
import AppointmentListItem from "./components/Appointment/AppointmentListItem.vue";
import AppointmentForm from "./components/Appointment/AppointmentForm.vue";


const app = createApp(App);

// Register components
app.component("MainScreen", MainScreen);
app.component("AgentAvatar", AgentAvatar);
app.component("AgentAvatarList", AgentAvatarList);
app.component("AppointmentListItem", AppointmentListItem);
app.component("AppointmentForm", AppointmentForm);


app.mount("#app");
