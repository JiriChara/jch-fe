<template>
  <b-field>
    <b-upload v-model="files" @input="onChange">
      <a class="button">
        <b-icon pack="fa" icon="upload"></b-icon>
        <span>Click to upload</span>
      </a>
    </b-upload>

    <div v-if="files && files.length">
      <span class="file-name">
        <span>
          {{ files[0].name }}
        </span>
      </span>
    </div>

    <span class="button remove" v-if="files.length" @click="deleteFile()">
      <b-icon pack="fa" icon="trash"></b-icon>
    </span>
  </b-field>
</template>

<script>
  export default {
    name: 'jch-image-upload',

    data() {
      return {
        files: [],
      };
    },

    methods: {
      onChange(files) {
        if (!files.length) return;

        const file = files[0];

        this.$emit('file', file);

        const reader = new FileReader();

        reader.onload = (e) => {
          const dataURI = e.target.result;

          if (dataURI) {
            this.$emit('load', dataURI);

            this.preview = dataURI;
          }
        };

        reader.readAsDataURL(file);
      },

      deleteFile() {
        this.files.splice(0, 1);
      },
    },
  };
</script>
