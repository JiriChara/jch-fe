<template>
  <form @submit="onSubmit">
    <div class="field">
      <label class="label">Name</label>

      <p class="control has-icon has-icon-right">
        <input
          ref="name"
          class="input"
          type="text"
          v-model="name"
          @input="$v.name.$touch()"
          placeholder="Choose a name for your project"
          autofocus />

        <span v-if="$v.name.$error" class="icon is-small">
          <i class="fa fa-warning"></i>
        </span>
      </p>

      <p v-if="$v.name.$error" class="help is-danger">Name is required</p>
    </div>

    <div class="field">
      <label class="label">Image</label>

      <p class="control">
        <jch-image-upload @load="onLoad" />
      </p>
    </div>

    <div class="field">
      <label class="label">Url</label>

      <p class="control has-icon has-icon-right">
        <input
          ref="url"
          class="input"
          type="text"
          v-model="url"
          @input="$v.url.$touch()"
          placeholder="Choose a url for your project"
          autofocus />

        <span v-if="$v.url.$error" class="icon is-small">
          <i class="fa fa-warning"></i>
        </span>
      </p>

      <p v-if="$v.url.$error" class="help is-danger">Url is required</p>
    </div>

    <div class="field">
      <label class="label">Slug</label>

      <p class="control">
        <input
          ref="slug"
          class="input"
          type="text"
          v-model="slug"
          @input="$v.slug.$touch()"
          placeholder="Choose a slug for your project"
          autofocus />
      </p>
    </div>

    <div class="field">
      <label class="label">Description</label>

      <p class="control">
        <textarea
          v-model="description"
          @input="$v.description.$touch()"
          class="textarea"
          placeholder="Textarea">
        </textarea>

        <span v-if="$v.description.$error" class="icon is-small">
          <i class="fa fa-warning"></i>
        </span>
      </p>

      <p v-if="$v.description.$error" class="help is-danger">Description is required</p>
    </div>

    <div class="field is-grouped">
      <p class="control">
        <button
          class="button is-primary"
          :disabled="$v.$invalid"
          @click.prevent="onSubmit">
          Submit
        </button>
      </p>

      <p class="control">
        <button @click.prevent="onReset" class="button is-link">Cancel</button>
      </p>
    </div>
  </form>
</template>

<script>
  import { required } from 'vuelidate/lib/validators';

  import ImageUpload from '@/components/utils/ImageUpload';

  export default {
    components: {
      'jch-image-upload': ImageUpload,
    },

    props: {
      project: {
        type: Object,
        default: () => ({}),
      },
    },

    data() {
      return {
        name: this.project.name || '',
        slug: this.project.slug || '',
        url: this.project.url || '',
        description: this.project.description || '',
        image: this.project.image || '',
      };
    },

    methods: {
      onLoad(file) {
        this.image = file;
      },

      onSubmit() {
        this.$emit('submit', this.serialize());
      },

      onReset() {
        this.$emit('reset', this.serialize());
      },

      serialize() {
        return {
          name: this.name,
          slug: this.slug,
          url: this.url,
          description: this.description,
          image: this.image,
        };
      },
    },

    validations: {
      name: {
        required,
      },

      description: {
        required,
      },

      url: {
        required,
      },

      slug: {},
    },
  };
</script>
