<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          text
          color="green lighten-2"
          dark
          v-on="on"
        >
          Adicionar Contato
        </v-btn>
      </template>

      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Contato Emergencia
        </v-card-title>

        <v-card-text>
          <v-text-field
            v-model="lastname"
            :rules="nameRules"
            :counter="100"
            label="Nome"
            required
          ></v-text-field>
          <v-text-field
            v-model="lastname"
            :rules="nameRules"
            :counter="10"
            label="Email"
            required
          ></v-text-field>
          <v-text-field
            v-model="lastname"
            :rules="nameRules"
            :counter="10"
            label="Telefone"
            required
          ></v-text-field>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            Adicionar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>