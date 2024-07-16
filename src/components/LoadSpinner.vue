<template>
    <v-dialog v-model="isLoading" persistent width="auto">
        <v-card color="white">
            <v-card-text>
                <v-progress-circular indeterminate color="primary" :size="128" :width="16"></v-progress-circular>
            </v-card-text>
            <v-card-title style="text-align: center;">Loading...</v-card-title>
        </v-card>
    </v-dialog>
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