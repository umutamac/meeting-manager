<template>
    <v-overlay v-if="isLoading" color="rgba(255, 255, 255, 0.8)">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { State } from "../store";

const store = useStore<State>();

const isLoading = computed(() => store.getters.isLoading);

</script>

<style scoped>
</style>