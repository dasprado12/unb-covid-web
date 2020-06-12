<template>
    <v-app>
        <Toolbar/>
        <v-content>
            <router-view class=""></router-view>
        </v-content>
        <Footer/>
    </v-app>
</template>



<script>
import Toolbar from "./Home/components/Toolbar.vue"
export default {
    components: {
        Toolbar
    },

    data: () => ({
    //
})
};
</script>
