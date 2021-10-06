<template>
  <v-row justify="center" class="file-manager">
    <v-card max-width="500">
      <v-expansion-panels v-model="panel" multiple>
        <v-expansion-panel>
          <v-expansion-panel-header>Uploading</v-expansion-panel-header>
          <v-expansion-panel-content v-if="isUploading && uploadingFile">
            <app-file
              :file="uploadingFile"
              :icon="getIcon(uploadingFile)"
              :iconColor="getIconColor(uploadingFile)"
              :uploadingPage="true"
            >
              <template v-slot:icon>
                <v-progress-circular
                  indeterminate
                  color="blue"
                  :width="2"
                  size="20"
                ></v-progress-circular>
              </template>
              <template v-slot:status>
                <div>Encrypting...</div>
              </template>
            </app-file>
          </v-expansion-panel-content>
          <v-expansion-panel-content v-else>
            <small>Waiting for file uploads...</small>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>Next Up</v-expansion-panel-header>
          <v-expansion-panel-content v-if="nextUpFiles.length">
            <app-file
              v-for="file in nextUpFiles"
              :key="file.id"
              :file="file"
              :icon="getIcon(file)"
              :iconColor="getIconColor(file)"
              :uploadingPage="false"
              @remove="removeFile({ file: $event, panel: 'nextup' })"
            >
              <template v-slot:icon>
                <v-progress-circular
                  :value="100"
                  color="blue-grey"
                  :width="2"
                  size="20"
                ></v-progress-circular>
              </template>
              <template v-slot:status>
                <div>Waiting...</div>
              </template>
            </app-file>
          </v-expansion-panel-content>
          <v-expansion-panel-content v-else>
            <small>No Nextup files</small>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>Completed</v-expansion-panel-header>
          <v-expansion-panel-content v-if="uploadedFiles.length">
            <app-file
              v-for="(file, index) in uploadedFiles"
              :key="index"
              :file="file"
              :icon="getIcon(file)"
              :iconColor="getIconColor(file)"
              :uploadingPage="false"
              @remove="removeFile({ file: $event, panel: 'completed' })"
            >
              <template v-slot:icon>
                <v-icon color="green">mdi-check-circle</v-icon>
              </template>
              <template v-slot:status>
                <div>Done</div>
              </template>
            </app-file>
          </v-expansion-panel-content>
          <v-expansion-panel-content v-else>
            <small>No file uploads completed yet</small>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header
            >Incomplete Uploads</v-expansion-panel-header
          >
          <v-expansion-panel-content v-if="incompleteFiles.length">
            <app-file
              v-for="file in incompleteFiles"
              :key="file.id"
              :file="file"
              :icon="getIcon(file)"
              :iconColor="getIconColor(file)"
              :uploadingPage="false"
              @remove="removeFile({ file: $event, panel: 'incompleted' })"
            >
              <template v-slot:icon>
                <v-icon color="red">mdi-refresh</v-icon>
              </template>
              <template v-slot:status>
                <div>Failed</div>
              </template>
            </app-file>
          </v-expansion-panel-content>
          <v-expansion-panel-content v-else>
            <small>No incomplete uploads yet</small>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
  </v-row>
</template>

<script>
import AppFile from "@/components/AppFile.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "FileManager",
  components: {
    AppFile,
  },
  data() {
    return {
      panel: [0, 1, 2, 3],
    };
  },
  watch: {
    isUploading(uploading) {
      if (!uploading) {
        this.uploadQuedFiles(this.nextUpFiles);
      }
    },
  },
  computed: {
    ...mapGetters("upload", [
      "uploadedFiles",
      "incompleteFiles",
      "uploadingFile",
      "isUploading",
      "nextUpFiles",
    ]),
  },
  methods: {
    ...mapActions("upload", ["uploadQuedFiles", "removeFile"]),
    getIcon(file) {
      if (file.mimeType.includes("image")) {
        return "mdi-image";
      } else if (file.mimeType.includes("zip")) {
        return "mdi-zip-box";
      } else if (file.mimeType.includes("wordprocessingml")) {
        return "mdi-file-word";
      } else if (file.mimeType.includes("pdf")) {
        return "mdi-file-pdf-box";
      } else if (file.mimeType.includes("spreadsheetml")) {
        return "mdi-file-excel";
      }
    },
    getIconColor(file) {
      if (file.mimeType.includes("image")) {
        return "blue";
      } else if (file.mimeType.includes("zip")) {
        return "yellow";
      } else if (file.mimeType.includes("wordprocessingml")) {
        return "blue";
      } else if (file.mimeType.includes("pdf")) {
        return "red";
      } else if (file.mimeType.includes("spreadsheetml")) {
        return "green";
      }
    },
  },
};
</script>

<style scoped>
.file-manager {
  margin-top: 20px;
}
</style>
