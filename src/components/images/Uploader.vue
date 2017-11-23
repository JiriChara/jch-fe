<template>
  <div>
    <b-field class="uploader">
      <jch-images-upload
        :files="imagesForUpload"
        @upload="onUploadImages"
        :show-upload-button="true">
      </jch-images-upload>
    </b-field>

    <jch-image-table-preview
      v-if="imageList.length"
      :images="imageList"
      @remove="onRemoveImage">
    </jch-image-table-preview>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';

  import JchImagesUpload from '@/components/utils/ImagesUpload';
  import JchImageTablePreview from '@/components/images/TablePreview';

  export default {
    name: 'jch-image-uploader',

    props: {
      imageableType: {
        type: String,
        required: true,
      },

      imageableId: {
        type: Number,
        required: true,
      },
    },

    components: {
      JchImagesUpload,
      JchImageTablePreview,
    },

    data() {
      return {
        imagesForUpload: [],
      };
    },

    computed: {
      ...mapGetters('images', {
        imageList: 'list',
      }),
    },

    methods: {
      ...mapActions('images', {
        createImage: 'create',
        destroyImage: 'destroy',
        fetchImages: 'fetchList',
      }),

      async onUploadImages(images) {
        this.$Progress.start();

        const promises = images.map((image) => {
          const data = {
            image: {
              name: image.name,
              imageableType: this.imageableType,
              imageableId: this.imageableId,
              file: image.dataURI,
            },
          };

          return this.createImage({ data });
        });

        try {
          await Promise.all(promises);

          this.$snackbar.open({
            message: 'Image was successfully uploaded',
            type: 'is-success',
          });

          this.$Progress.finish();
        } catch (e) {
          this.$snackbar.open({
            message: 'Cannot upload an image',
            type: 'is-danger',
          });

          this.$Progress.fail();
        }

        this.imagesForUpload = [];

        this.fetchData();
      },

      onRemoveImage(id) {
        this.$dialog.confirm({
          title: 'Delete Image?',
          message: 'Are you sure?',
          confirmText: 'Delete',
          type: 'is-danger',
          hasIcon: true,
          onConfirm: async () => {
            this.$Progress.start();

            try {
              await this.destroyImage({ id });

              this.$snackbar.open({
                message: 'Image was successfully removed',
                type: 'is-success',
              });

              this.$Progress.finish();
            } catch (e) {
              this.$snackbar.open({
                message: 'Cannot remove image',
                type: 'is-danger',
              });

              this.$Progress.fail();
            }
          },
        });
      },

      fetchData() {
        const config = {
          params: {
            byImageableType: 'Article',
            byImageableId: this.imageableId,
          },
        };

        return this.fetchImages({ config })
          .then(() => this.$Progress.finish())
          .catch(() => this.$Progress.fail());
      },
    },

    created() {
      this.fetchData();
    },
  };
</script>
