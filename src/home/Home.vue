<template>
    <v-app>
        <tool-bar></tool-bar>
        <span>
            <router-view/>
        </span>
    </v-app>
</template>

<script>
import ToolBar from "../home/components/Toolbar.vue"

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