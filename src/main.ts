import { createApp } from "vue";
// Vuetify
import "vuetify/styles"
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
//Components
import App from "./App.vue"
import AppointmentList from "./components/Appointment/AppointmentList.vue";
import AgentAvatar from "./components/Agent/AgentAvatar.vue";
import AgentAvatarList from "./components/Agent/AgentAvatarList.vue";
import AppointmentListItem from "./components/Appointment/AppointmentListItem.vue";
import AppointmentForm from "./components/Appointment/AppointmentForm.vue";


const app = createApp(App);

// Register components
app.component("AppointmentList", AppointmentList);
app.component("AgentAvatar", AgentAvatar);
app.component("AgentAvatarList", AgentAvatarList);
app.component("AppointmentListItem", AppointmentListItem);
app.component("AppointmentForm", AppointmentForm);

const vuetify = createVuetify({
  components,
  directives,
});

app.use(vuetify).mount("#app");

//app.mount("#app");
