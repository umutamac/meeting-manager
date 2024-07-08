import { createApp } from 'vue'
import App from './App.vue'
import MainScreen from './components/MainScreen.vue';
import ListItem from './components/ListItem.vue';

const app = createApp(App);

// Register components
app.component('MainScreen', MainScreen);
app.component('ListItem', ListItem);


app.mount('#app')
