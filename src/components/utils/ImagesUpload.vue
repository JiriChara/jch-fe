<template>
  <div>
    <b-field label="Images">
      <b-upload @input="onChange" v-model="files" multiple>
        <a class="button">
          <b-icon pack="fa" icon="hand-pointer-o"></b-icon>
          <span>Click to select</span>
        </a>

        <a
          class="button is-primary"
          v-if="files.length && showUploadButton"
          @click.prevent="onUploadImages">
          <b-icon icon="cloud-upload"></b-icon>
          <span>Upload</span>
        </a>
      </b-upload>
    </b-field>

    <div class="tags">
      <b-tag v-for="(file, index) in files"
        size="is-medium"
        closable
        @close="onDeleteFile(index, file.dataURI)"
        :key="index">
        <span class="icon" v-if="previews[file.name]">
          <span class="image is-16x16">
            <img :src="previews[file.name].dataURI" :alt="file.name" />
          </span>
        </span>
        <span>
          {{file.name}}
        </span>
      </b-tag>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';

  export default {
    name: 'jch-images-upload',

    props: {
      files: {
        type: Array,
        required: true,
      },

      showUploadButton: {
        type: Boolean,
        default: false,
      },
    },

    data() {
      return {
        previews: {},
      };
    },

    methods: {
      onChange(files) {
        if (!files.length) return;

        files.forEach((file) => {
          const reader = new FileReader();

          reader.onload = (e) => {
            const dataURI = e.target.result;

            if (dataURI) {
              this.$emit('load', dataURI);

              Vue.set(this.previews, file.name, {
                name: file.name,
                dataURI,
              });
            }
          };

          reader.readAsDataURL(file);
        });
      },

      onDeleteFile(index, dataURI) {
        const file = this.files[index];
        Vue.delete(this.previews, file.name);
        this.files.splice(index, 1);
        this.$emit('remove', dataURI);
      },

      onUploadImages() {
        this.$emit('upload', Object.keys(this.previews).map(key => this.previews[key]));
      },
    },
  };
</script>

<style lang="scss" scoped>
  .tags {
    margin-bottom: 0.75rem;
  }
</style>
