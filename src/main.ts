import { createApp } from "vue";
import { registerGlobalComponents } from "./register-component";
import { vuetifyPlugin } from "./vuetify-plugin";
import store from "./store";
import App from "./App.vue";

const app = createApp(App);

app.use(registerGlobalComponents).use(vuetifyPlugin).use(store).mount("#app");
