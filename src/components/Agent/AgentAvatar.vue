<template>
    <div class="avatar" :style="{ backgroundColor: color }">
        {{ getInitials() }}
    </div>
</template>
<script lang="ts" setup>
import { defineProps, withDefaults } from "vue";

type Props = {
    firstName: string,
    lastName: string,
    color: string
};

const props = withDefaults(defineProps<Props>(), {
    color: "beige"
});

//const appointment = ref<any>(null);
function getInitials() {
    return `${props.firstName.charAt(0)} ${props.lastName.charAt(0)}`;
}

</script>
<style scoped>
.avatar {
    border: 1px gray solid;
    border-radius: 50%;
    padding: 5px;
}
</style>