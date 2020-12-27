<template>
    <div>
        <v-row>
            <v-col cols="12">
                <v-card flat>
                    <v-card-title>
                        <h3>Informações Gerais</h3>
                    </v-card-title>
                    <v-card-text>
                        Caro colaborador, este sistema tem o objetivo de melhorar a segurança do nosso campus e tornar mais segura a convivência na Universidade de Brasília. <br>
                        Abaixo, estão dispostas algumas dicas de como se portar em abordagens nos períodos do dia e os protocolos de segurança.
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-divider/>
    </div>
</template>

<script>
export default {
    data(){
        return {
            cards: [ 
                { text_color: "black--text", color: "yellow lighten-2", icon: "mdi-white-balance-sunny",  title: "Manhã", text: "O período da manhã costuma ser mais tranquilo na universiade. Pouco movimento e menos pessoas andando. Siga os protocolos de nível 0" },
                { text_color: "black--text", color: "amber darken-4", icon: "mdi-weather-sunny", title: "Tarde", text: "O período da tarde é o mais movimentado na universidade, aglomerações, e tumultos são comuns. Esteja preparado para identificar problemas! Siga os protocolos de nível 0" },
                { text_color: "grey--text text--lighten-2", color: "indigo darken-3", icon: "mdi-weather-night", title: "Noite", text: "O período da noite é o que se deve ter mais atenção! Cuidado ao fazer abordagens e esteja sempre alerta a acontecimentos. Siga os protocolos de emergência"  },
                { text_color: "white--text text--lighten-2", color: "grey darken-4", icon: "mdi-weather-night", title: "Madrugada", text: "Período de vigilância, qualquer problema ou alertas devem seguir os protocolos de emergência"  },
            ],
        }
    }
}
</script>

<style scoped>

</style>