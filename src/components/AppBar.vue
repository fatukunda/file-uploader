<template>
  <div>
    <v-app-bar dense>
      <v-toolbar-title>Manage Files</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon color="blue" @click.native="startUpload">mdi-plus</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "AppBar",
  methods: {
    ...mapActions("upload", ["startUpload"]),
  },
};
</script>

<style scoped></style>
