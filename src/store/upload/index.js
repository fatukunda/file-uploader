import Vue from "vue";
import { files } from "../../helpers";

export default {
  namespaced: true,
  state: {
    isUploading: false,
    completedFiles: [],
    incompleteUploads: [],
    nextUpFiles: [],
    uploadingFile: null,
    allFiles: files,
  },
  mutations: {
    SET_UPLOAD(state, isUploading) {
      state.isUploading = isUploading;
    },
    SET_COMPLETED_FILES(state, file) {
      state.completedFiles = [...state.completedFiles, file];
    },
    SET_ALL_COMPLETE_FILES(state, files) {
      state.completedFiles = files;
    },
    SET_INCOMPLETED_FILES(state, file) {
      state.incompleteUploads = [...state.incompleteUploads, file];
    },
    SET_ALL_INCOMPLETE_FILES(state, files) {
      state.incompleteUploads = files;
    },
    SET_NEXT_UP_FILES(state, file) {
      state.nextUpFiles = [...state.nextUpFiles, file];
    },
    SET_ALL_NEXT_UP_FILES(state, files) {
      state.nextUpFiles = files;
    },
    RE_SET_NEXT_UP_FILES(state, files) {
      state.nextUpFiles = files;
    },
    SET_UPLOADING_FILE(state, file) {
      state.uploadingFile = file;
    },
    SET_ALL_FILES(state, files) {
      state.allFiles = files;
    },
  },
  getters: {
    uploadedFiles: (state) => state.completedFiles,
    incompleteFiles: (state) => state.incompleteUploads,
    isUploading: (state) => state.isUploading,
    uploadingFile: (state) => state.uploadingFile,
    nextUpFiles: (state) => state.nextUpFiles,
  },
  actions: {
    startUpload({ commit, state }) {
      const filesCopy = state.allFiles;
      // Get a random file from the copied list of files.
      const randomFile =
        filesCopy[Math.floor(Math.random() * filesCopy.length)];
      // Remove the random file from the copied list so that it won't be uploaded again.
      const modifiedFiles = filesCopy.filter(
        (file) => file.id !== randomFile.id
      );
      commit("SET_ALL_FILES", modifiedFiles);
      // Check if an upload is taking place
      const uploadChance = Math.random() * 100;
      if (state.isUploading) {
        commit("SET_NEXT_UP_FILES", randomFile);
        return;
      }
      commit("SET_UPLOAD", true);
      commit("SET_UPLOADING_FILE", randomFile);
      setTimeout(() => {
        if (uploadChance >= 75) {
          commit("SET_COMPLETED_FILES", randomFile);
          commit("SET_UPLOADING_FILE", null);
          commit("SET_UPLOAD", false);
        } else {
          Vue.set(randomFile, "status", "Failed");
          commit("SET_INCOMPLETED_FILES", randomFile);
          commit("SET_UPLOADING_FILE", null);
          commit("SET_UPLOAD", false);
        }
      }, 5000);
    },
    uploadQuedFiles({ commit }, files) {
      files.forEach((file) => {
        //Remove file from the que
        const quedFiles = files.filter((fl) => fl.id !== file.id);
        commit("RE_SET_NEXT_UP_FILES", quedFiles);
        const uploadChance = Math.random() * 100;
        commit("SET_UPLOAD", true);
        commit("SET_UPLOADING_FILE", file);
        setTimeout(() => {
          if (uploadChance >= 75) {
            Vue.set(file, "status", "Canceled");
            commit("SET_COMPLETED_FILES", file);
            commit("SET_UPLOAD", false);
            commit("SET_UPLOADING_FILE", null);
          } else {
            Vue.set(file, "status", "Failed");
            commit("SET_INCOMPLETED_FILES", file);
            commit("SET_UPLOAD", false);
            commit("SET_UPLOADING_FILE", null);
          }
        }, 5000);
      });
    },
    removeFile({ commit, state }, data) {
      const { file, panel } = data;
      let modifiedFiles = [];
      if (panel === "incompleted") {
        modifiedFiles = state.incompleteUploads.filter(
          (fl) => fl.id !== file.id
        );
        commit("SET_ALL_INCOMPLETE_FILES", modifiedFiles);
      } else if (panel === "completed") {
        Vue.set(file, "status", "Canceled");
        modifiedFiles = state.completedFiles.filter((fl) => fl.id !== file.id);
        commit("SET_ALL_COMPLETE_FILES", modifiedFiles);
        commit("SET_INCOMPLETED_FILES", file);
      } else if (panel === "nextup") {
        Vue.set(file, "status", "Canceled");
        modifiedFiles = state.nextUpFiles.filter((fl) => fl.id !== file.id);
        commit("SET_ALL_NEXT_UP_FILES", modifiedFiles);
        commit("SET_INCOMPLETED_FILES", file);
      }
    },
  },
};
