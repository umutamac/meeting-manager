import type { App } from "vue";
//Components
import LoadSpinner from "./components/LoadSpinner.vue";
import DatePicker from "./components/DatePicker.vue";

import AppointmentList from "./components/Appointment/AppointmentList.vue";
//import AgentAvatar from "./components/Agent/AgentAvatar.vue";
import AgentAvatarList from "./components/Agent/AgentAvatarList.vue";
import AppointmentListItem from "./components/Appointment/AppointmentListItem.vue";
import AppointmentForm from "./components/Appointment/AppointmentForm.vue";

export const registerGlobalComponents = {
    install(app: App<Element>) {
        app.
            component("LoadSpinner", LoadSpinner).
            component("DatePicker", DatePicker).
            component("AppointmentList", AppointmentList).
            component("AgentAvatarList", AgentAvatarList).
            component("AppointmentListItem", AppointmentListItem).
            component("AppointmentForm", AppointmentForm)
    }
};