import "vuetify/styles"
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css";

export const vuetifyPlugin = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: "mdi",
    },
    theme: {
        themes: {
            light: {
                dark: false,
                colors: {
                    hotPink: "rgb(243, 109, 131)"
                }
            },
        },
    },
});
