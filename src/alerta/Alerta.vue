<template>
    <v-app>oi
        <tool-bar></tool-bar>
        <v-content class="mx-6 mb-4">
        <router-view></router-view>
    </v-content>
    </v-app>
</template>

<script>
import ToolBar from "./components/Toolbar.vue"

export default {
    components: {
        ToolBar
    },
    data(){
        return {

        }
    }
}
</script>