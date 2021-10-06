<template>
  <v-card outlined class="card" color="#f6f7fc">
    <v-card-text>
      <v-row>
        <v-col cols="6">
          <v-row>
            <v-col cols="3" align-self="center">
              <v-icon :color="iconColor" large>{{ icon }}</v-icon>
            </v-col>
            <v-col>
              <p class="image-name">{{ file.name }}</p>
              <small>{{ file.size }}</small>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="4">
          <v-row>
            <v-col align="center" justify="center">
              <slot name="icon" />
              <slot name="status" />
            </v-col>
          </v-row>
        </v-col>
        <v-col align="end" v-if="!uploadingPage">
          <v-icon class="close" @click.native="$emit('remove', file)"
            >mdi-close</v-icon
          >
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "AppFile",
  props: {
    file: {
      type: Object,
      required: true,
    },
    icon: {
      type: String,
    },
    iconColor: {
      type: String,
    },
    uploadingPage: {
      type: Boolean,
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
.close {
  cursor: pointer;
}
</style>
