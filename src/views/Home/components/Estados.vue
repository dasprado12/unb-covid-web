<template>
    <div class="estados">
    <nav>
    </nav>
        <v-flex fluid>
            
            <v-col cols="12" sm="2" md="2">
                    <v-toolbar color="teal" dark>
                        <v-app-bar-nav-icon></v-app-bar-nav-icon>
                        <v-toolbar-title>Estados</v-toolbar-title>
                    </v-toolbar>
                    <v-list>
                        <v-list-group v-for="item in items" :key="item.title">
                            <template v-slot:activator>
                                <v-list-item-content>
                                    <v-list-item-title v-text="item.title"></v-list-item-title>
                                </v-list-item-content>
                            </template>
                            <v-list-item v-for="i in item.items" :key="i">
                                <v-container fluid>
                                        <v-checkbox :key="i.title" v-model="selected" :label="i.title" :value="i.title"></v-checkbox>
                                </v-container>
                            </v-list-item>
                        </v-list-group>
                    </v-list>
            </v-col>
            
            <v-col cols="12" sm="2" md="2">
                {{ selected }}
            </v-col>
        </v-flex>
    </div>
</template>


<script>
export default {
    data () {
    return {
        drawer: true,
        selected: [],    
        items: [
            {
                title: 'DF',
                items: [
                    { title: "ÁGUAS CLARAS" }, 
                    { title: "RECANTO DAS EMAS" }, 
                    { title: "SAMAMBAIA" }, 
                    { title: "TAGUATINGA" }, 
                    { title: "VICENTE PIRES" }, 
                    { title: "CENTRAL" }, 
                    { title: "SUDOESTE" }, 
                    { title: "PLANO PILOTO" }, 
                    { title: "SUDOESTE/OCTOGONAL" }, 
                    { title: "LAGO NORTE" }, 
                    { title: "LAGO SUL" }, 
                    { title: "VARJÃO DO TORTO" }, 
                    { title: "CENTRO SUL" }, 
                    { title: "CANDANGOLÂNDIA" }, 
                    { title: "PARKWAY" }, 
                    { title: "GUARÁ" }, 
                    { title: "NÚCLEO BANDEIRANTE" }, 
                    { title: "RIACHO FUNDO I" }, 
                    { title: "RIACHO FUNDO II" }, 
                    { title: "SCIA (ESTRUTURAL)" }, 
                    { title: "CRUZEIRO" }, 
                    { title: "NORTE" }, 
                    { title: "FERCAL" }, 
                    { title: "PLANALTINA" }, 
                    { title: "SOBRADINHO I" }, 
                    { title: "SOBRADINHO II" }, 
                    { title: "GAMA" }, 
                    { title: "SANTA MARIA" }, 
                    { title: "LESTE" }, 
                    { title: "JARDIM BOTÂNICO" }, 
                    { title: "ITAPOÃ" }, 
                    { title: "PARANOÁ" }, 
                    { title: "SÃO SEBASTIÃO" }, 
                    { title: "SUL" }, 
                    { title: "OESTE" }, 
                    { title: "BRAZLÂNDIA" }, 
                    { title: "CEILÂNDIA" }, 
                    { title: "POPULAÇÃO PRIVADA DE LIBERDADE" }, 
                    { title: "S I A" }, 
                    { title: "RA EM INVESTIGAÇÃO" }
                ],
            }   
        ],
    }
    },
}
</script>