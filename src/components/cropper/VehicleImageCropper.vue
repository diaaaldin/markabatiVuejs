<script>
import Cropper from 'cropperjs';
import { mapGetters, mapActions } from "vuex";
import Swal from 'sweetalert2';
// // for file pond
// import vueFilePond from 'vue-filepond';
// // Import plugins
// import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type/dist/filepond-plugin-file-validate-type.esm.js';
// import FilePondPluginImagePreview from 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.esm.js';
// import FilePondPluginImageEditor from "@pqina/filepond-plugin-image-editor";
// import FilePondPluginFilePoster from "filepond-plugin-file-poster";

// // Import styles
// import 'filepond/dist/filepond.min.css';
// import "filepond-plugin-file-poster/dist/filepond-plugin-file-poster.min.css";
// import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';

// // Import Pintura styles
// import "@pqina/pintura/pintura.css";
// // Import Pintura
// import {
//   // editor
//   createDefaultImageReader,
//   createDefaultImageWriter,
//   locale_en_gb,
//   // plugins
//   setPlugins,
//   plugin_crop,
//   plugin_crop_locale_en_gb,
//   plugin_filter,
//   plugin_filter_defaults,
//   plugin_filter_locale_en_gb,
//   plugin_finetune,
//   plugin_finetune_defaults,
//   plugin_finetune_locale_en_gb,
//   plugin_annotate,
//   plugin_annotate_locale_en_gb,
//   markup_editor_defaults,
//   markup_editor_locale_en_gb,

//   // filepond
//   openEditor,
//   processImage,
//   createDefaultImageOrienter,
//   legacyDataToImageState,
// } from "@pqina/pintura";

// setPlugins(plugin_crop, plugin_finetune, plugin_filter, plugin_annotate);

// // Create FilePond component
// const FilePond = vueFilePond(
//   FilePondPluginFilePoster,
//   FilePondPluginImageEditor,
// );

export default {

  data() {
    return {
      selectedFile: null,
      imageSrc: null,
      imageres: null,
      cropper: null,
      imageCropper:null,
      ImageCropperBase64: '',


      // myEditor: {
      //   // map legacy data objects to new imageState objects
      //   legacyDataToImageState: legacyDataToImageState,
      //   // used to create the editor, receives editor configuration, should return an editor instance
      //   createEditor: openEditor,
      //   // Required, used for reading the image data
      //   imageReader: [createDefaultImageReader],
      //   // optionally. can leave out when not generating a preview thumbnail and/or output image
      //   imageWriter: [createDefaultImageWriter],
      //   // used to generate poster images, runs an editor in the background
      //   imageProcessor: processImage,
      //   // editor options
      //   editorOptions: {
      //     utils: ['crop', 'finetune', 'filter', 'annotate'],
      //     imageOrienter: createDefaultImageOrienter(),
      //     ...plugin_finetune_defaults,
      //     ...plugin_filter_defaults,
      //     ...markup_editor_defaults,
      //     locale: {
      //       ...locale_en_gb,
      //       ...plugin_crop_locale_en_gb,
      //       ...plugin_finetune_locale_en_gb,
      //       ...plugin_filter_locale_en_gb,
      //       ...plugin_annotate_locale_en_gb,
      //       ...markup_editor_locale_en_gb,
      //     },
      //   },
      // },

    };
  },

  components: {
   // FilePond,
  },
  emits: ['IsShow', 'b64image' , 'copperImage'],

  methods: {
    ...mapActions("Users", ["UserProfileInfo", "UpdateImageProfile"]),

    closeModal(image) {
      this.$emit('b64image', image);
      this.$emit('IsShow', false);
      this.$emit('copperImage' , this.imageCropper);
    },


    fileChanged(e) {
      console.log("image befor cropper : " , e);
      const files = e.target.files || e.dataTransfer.files;
      if (files.length) {
        this.selectedFile = files[0];
        const fileReader = new FileReader();
        fileReader.onload = (event) => {
          this.imageSrc = event.target.result;
        };
        fileReader.readAsDataURL(this.selectedFile);
      }
    },

    fileCleared() {
      this.selectedFile = null;
      this.imageSrc = null;
    },

    handleImageCropped() {
      var self = this;
      this.cropper.getCroppedCanvas().toBlob((blob) => {
        // Create a new File object from the blob
        const file = new File([blob], 'cropped_image.jpg', { type: 'image/jpeg' });
        this.imageCropper = file;
        self.passImgAsBase64(file);
      }, 'image/jpeg');
      this.selectedFile = null;
    },

    passImgAsBase64(file) {
      var self = this;
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        this.ImageCropperBase64 = reader.result;
        self.closeModal(this.ImageCropperBase64);
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    },

    toProfilePage() {
      let Id = parseInt(localStorage.getItem("id"));
      this.UserProfileInfo(Id).then(Response => {
        this.$router.push({ name: "myStore" });
      }).catch(error => {
        Swal.fire(error.response.data.message);
      });
    },

  },

  mounted() {
    this.cropper = new Cropper(this.$refs.img, {
      aspectRatio: 1.75,
      minCropBoxWidth: 20,
      minCropBoxHeight: 20,
      viewMode: 3,
      dragMode: 'move',
      background: false,
      cropBoxMovable: true,
      cropBoxResizable: true,

    }
  );
  },

  beforeDestroy() {
    this.cropper.destroy();
  },

  watch: {
    imageSrc() {
      if (this.imageSrc) {
        this.cropper.replace(this.imageSrc);
      }
    },
  },


};
</script>

<template>
<!-- <FilePond ref="pond" 
			label-idle="Drop file here..."
		  accepted-file-types="image/jpeg, image/png"
			:imageEditor="myEditor" 
/> -->
  <div class="header">
    <input type="file" v-on:change="fileChanged" ref="imageInput" accept="image/*">
  </div>

  <div id="container">
    <div class="uploudedImageContaner">
      <h2>{{ $t('cropper_title') }}</h2>
      <img id="uploadedImage" ref="img" :src="imageSrc" alt="Uploaded Image">
    </div>
  </div>

  <div id="imageControls">
    <button id="cropButton" v-on:click="handleImageCropped()">{{ $t('general_submit_button') }}</button>
  </div>

</template>
<style scoped>
 /* General Styles */
body {
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
  color: #333;
  margin: 0;
  padding: 0;
}

/* Header */
.header {
  text-align: center;
  padding: 20px;
  background-color: #4CAF50;
  color: white;
  border-radius: 8px;
  margin-bottom: 20px;
}

.header h1 {
  margin: 0;
  font-size: 1.8em;
}

.header input[type="file"] {
  display: inline-block;
  margin: 15px 0;
  padding: 10px;
  font-size: 1em;
  border-radius: 5px;
  border: 1px solid #ddd;
}
/* Container */
#container {
  display: flex;
  justify-content: center;
  margin: 0 auto;
  padding: 20px;
  max-width: 600px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.uploudedImageContaner {
  text-align: center;
}

.uploudedImageContaner h2 {
  font-size: 1.5em;
  color: #555;
  margin-bottom: 15px;
}

#uploadedImage {
  max-width: 100%;
  max-height: 400px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Image Controls */
#imageControls {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  margin: 20px auto 0;
  max-width: 600px;
}

#cropButton, #cancelButton {
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  flex: 1;
  margin: 0 5px;
}

#cropButton {
  background-color: #4CAF50;
  color: white;
}

#cropButton:hover {
  background-color: #388E3C;
}

#cancelButton {
  background-color: #F44336;
  color: white;
}

#cancelButton:hover {
  background-color: #D32F2F;
}

/* Responsive Design */
@media (max-width: 768px) {
  #container {
    padding: 15px;
  }

  .header input[type="file"] {
    width: 100%;
    margin: 10px 0;
  }

  #imageControls {
    flex-direction: column;
  }

  #cropButton, #cancelButton {
    margin: 5px 0;
  }
}

@media (max-width: 480px) {
  .header h1 {
    font-size: 1.5em;
  }

  .uploudedImageContaner h2 {
    font-size: 1.2em;
  }

  #cropButton, #cancelButton {
    font-size: 0.9em;
    padding: 10px;
  }
}
</style>