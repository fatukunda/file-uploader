<template>
  <v-app>
    <app-bar />
    <v-main>
      <file-manager />
    </v-main>
  </v-app>
</template>

<script>
import AppBar from "@/components/AppBar.vue";
import FileManager from "@/components/FileManager.vue";

export default {
  name: "App",

  components: {
    AppBar,
    FileManager,
  },

  data: () => ({
    //
  }),
};
</script>
