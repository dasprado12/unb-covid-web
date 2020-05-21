<template>
    <div class="text-center">
        <v-bottom-sheet v-model="sheet" >
            <template v-slot:activator="{ on }">
                <v-btn v-on="on">
                    Selecionar RA
                </v-btn>
            </template>
            <v-sheet class="text-center" height="200px">
                <div class="my-3">
                    <v-btn small @click="select_ra(item)" v-for="item in regioes" :key="item">
                        {{item}}
                    </v-btn>
                </div>
            </v-sheet>
        </v-bottom-sheet>
    </div>
</template>


<script>
export default {
    props: [ 'regioes' ],
    data: () => ({
        sheet: false,
    }),
    methods: {
        select_ra(item){
            this.$emit('childToParent', item)
        }
    }
}
</script>