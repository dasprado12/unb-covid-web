<template>
    <div>
        <!-- {{ alerts }} -->
        <v-data-table
            :headers="headers"
            :items="alerts"
            class="elevation-1"
        ></v-data-table>
    </div>
</template>


<script>

export default {
    props: [ 'alerts' ],
    data () {
        return {
            headers: [
                { text: 'ID', align: 'left', value: 'id', sortable: 'id' },
                { text: 'Nome', value: 'name' },
                { text: 'Whatsapp', value: 'whatsapp' },
                { text: 'Criado em', value: 'createdAt' },
                { text: 'Atualizado em', value: 'updatedAt' },
                { text: 'Actions', value: 'action', sortable: false }
            ],
        }
    },
    }
</script>