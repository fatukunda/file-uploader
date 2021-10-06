<template>
  <v-card outlined class="card" color="#f6f7fc">
    <v-card-text>
      <v-row>
        <v-col cols="6">
          <v-row>
            <v-col cols="3" align-self="center">
              <v-icon color="green" large>mdi-image</v-icon>
            </v-col>
            <v-col>
              <p class="image-name">{{ name }}</p>
              <small>{{ size }}</small>
            </v-col>
          </v-row>
        </v-col>
        <v-col>
          <v-row>
            <v-col align="center" justify="center">
              <slot name="icon" />
              <slot name="status" />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "AppFile",
  props: {
    name: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.card {
  margin: 10px;
}
.image-name {
  margin: 0px;
  padding: 0px;
}
</style>
