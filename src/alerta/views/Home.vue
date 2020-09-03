<template>
    <div>
        <v-row>
            <v-col cols="12">
                <v-card flat>
                    <v-card-title>
                        Informações Gerais
                    </v-card-title>
                    <v-card-text>
                        Caro colaborador, este sistema tem o objetivo de melhorar a segurança do nosso campus e tornar mais segura a convivência na Universidade de Brasília. <br>
                        Abaixo, estão dispostas algumas dicas de como se portar em abordagens nos períodos do dia e os protocolos de segurança.
                        

                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col v-for="i in cards" :key="i" md="4" xs="12">
                <v-card>
                    <v-card-title>
                        {{i.title}}
                    </v-card-title>
                    <v-card-text>
                        {{i.text}}
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col v-for="i in protocols" :key="i" md="6" xs="12">
                <v-card>
                    <v-card-title>
                        {{i.title}}
                    </v-card-title>
                    <v-card-text>
                        <v-list-item v-for="j in i.protocol" :key="j">
                            {{ j }}
                        </v-list-item>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    data(){
        return {
            cards: [ 
                { color: "blue", title: "Manhã", text: "O período da manhã costuma ser mais tranquilo, siga o protocolo padrão" },
                { color: "blue", title: "Tarde", text: "O período da tarde costuma ter mais agitação, siga o protocolo padrão" },
                { color: "blue", title: "Noite", text: "O período da noite é o que se deve ter mais atenção! Cuidado ao fazer abordagens" },
            ],
            protocols: [
                {
                    title: "Protocolo Padrão",
                    protocol: [ "Cuidado nas abordagens", "Faça perguntas" ]
                },
                {
                    title: "Protocolo Emergencial",
                    protocol: [ "Cuidado nas abordagens", "Caso necessário, contate ajuda" ]
                }
            ]
        }
    }
}
</script>