<template>
  <div>
    <input
      type="file"
      @change="onChange" />
  </div>
</template>

<script>
  export default {
    name: 'jch-image-upload',

    data() {
      return {
        file: '',
      };
    },

    methods: {
      onChange(event) {
        const files = event.target.files || event.dataTransfer.files;

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
    },
  };
</script>
