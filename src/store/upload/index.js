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
    SET_INCOMPLETED_FILES(state, file) {
      state.incompleteUploads = [...state.incompleteUploads, file];
    },
    SET_NEXT_UP_FILES(state, file) {
      state.nextUpFiles = [...state.nextUpFiles, file];
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
    startUpload(context) {
      const filesCopy = context.state.allFiles;
      // Get a random file from the copied list of files.
      const randomFile =
        filesCopy[Math.floor(Math.random() * filesCopy.length)];
      // Remove the random file from the copied list so that it won't be uploaded again.
      const modifiedFiles = filesCopy.filter(
        (file) => file.id !== randomFile.id
      );
      context.commit("SET_ALL_FILES", modifiedFiles);
      // Check if an upload is taking place
      const uploadChance = Math.random() * 100;
      if (context.state.isUploading) {
        context.commit("SET_NEXT_UP_FILES", randomFile);
        return;
      }
      context.commit("SET_UPLOAD", true);
      context.commit("SET_UPLOADING_FILE", randomFile);
      setTimeout(() => {
        if (uploadChance >= 75) {
          context.commit("SET_COMPLETED_FILES", randomFile);
          context.commit("SET_UPLOADING_FILE", null);
          context.commit("SET_UPLOAD", false);
        } else {
          context.commit("SET_INCOMPLETED_FILES", randomFile);
          context.commit("SET_UPLOADING_FILE", null);
          context.commit("SET_UPLOAD", false);
        }
      }, 5000);
    },
    uploadQuedFiles(context, files) {
      files.forEach((file) => {
        //Remove file from the que
        const quedFiles = files.filter((fl) => fl.id !== file.id);
        context.commit("RE_SET_NEXT_UP_FILES", quedFiles);
        const uploadChance = Math.random() * 100;
        context.commit("SET_UPLOAD", true);
        context.commit("SET_UPLOADING_FILE", file);
        setTimeout(() => {
          if (uploadChance >= 75) {
            context.commit("SET_COMPLETED_FILES", file);
            context.commit("SET_UPLOAD", false);
            context.commit("SET_UPLOADING_FILE", null);
          } else {
            context.commit("SET_INCOMPLETED_FILES", file);
            context.commit("SET_UPLOAD", false);
            context.commit("SET_UPLOADING_FILE", null);
          }
        }, 5000);
      });
    },

    removeFileFromQue(files, file) {
      return files.filter((fl) => fl.id !== file.id);
    },
  },
};
