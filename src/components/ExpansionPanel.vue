<template>
  <v-expansion-panel>
    <v-expansion-panel-header>{{ name }}</v-expansion-panel-header>
    <v-expansion-panel-content v-if="isUploading && uploadingFile">
      <app-file :name="uploadingFile.name" :size="uploadingFile.size">
        <template v-slot:icon>
          <slot />
        </template>
        <template v-slot:status>
          <div>{{ statusText }}</div>
        </template>
      </app-file>
    </v-expansion-panel-content>
    <v-expansion-panel-content v-else>
      <small>{{ emptyStateText }}</small>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import AppFile from "@/components/AppFile.vue";
export default {
  name: "ExpansionPanel",
  components: {
    AppFile,
  },
  props: {
    name: {
      type: String,
    },
    statusText: {
      type: String,
    },
    emptyStateText: {
      type: String,
    },
    isUploading: {
      type: Boolean,
    },
    uploadingFile: {
      type: Object,
    },
  },
};
</script>
