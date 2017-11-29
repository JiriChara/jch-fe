<template>
  <b-table :data="images">
    <template slot-scope="props">
      <b-table-column label="ID">
        {{ props.row.id }}
      </b-table-column>

      <b-table-column label="Name">
        {{ props.row.name }}
      </b-table-column>

      <b-table-column label="Url">
        {{ props.row.file.url }}
      </b-table-column>

      <b-table-column label="Preview">
        <div class="image is-32x32">
          <img :src="props.row.file.url" />
        </div>
      </b-table-column>

      <b-table-column label="Actions">
        <button class="button is-danger" @click.prevent="onRemoveImage(props.row.id)">
          <b-icon icon="trash"></b-icon>
          <span>Remove</span>
        </button>
      </b-table-column>
    </template>
  </b-table>
</template>

<script>
  export default {
    name: 'jch-images-table-preview',

    props: {
      images: {
        type: Array,
        required: true,
      },
    },

    methods: {
      onRemoveImage(id) {
        this.$emit('remove', id);
      },
    },
  };
</script>
