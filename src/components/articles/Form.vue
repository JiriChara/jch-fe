<template>
  <form @submit="onSubmit">
    <b-field label="Title"
      :type="$v.title.$error ? 'is-danger': null"
      :message="titleErrorMessages">
      <b-input
        ref="title"
        v-model="title"
        @input="$v.title.$touch()"
        placeholder="Choose a title for your article"
        autofocus />
    </b-field>

    <b-field label="Slug">
      <b-input
        v-model="slug"
        @input="$v.slug.$touch()"
        placeholder="Choose a slug for your article" />
    </b-field>

    <b-field label="Content"
      :type="$v.content.$error ? 'is-danger': null"
      :message="contentErrorMessages">
        <b-input
          type="textarea"
          v-model="content"
          @input="$v.content.$touch()" />
    </b-field>

    <b-field label="Tags" v-if="article.createdAt">
      <b-select v-model="tags" multiple>
        <option v-for="tag in tagList" :key="tag.id" :value="tag.name">
          {{ tag.name }}
        </option>
      </b-select>
    </b-field>

    <jch-image-uploader
      v-if="article.createdAt"
      :imageable-id="article.id"
      imageable-type="Article">
    </jch-image-uploader>

    <b-field label="Publish?">
      <b-switch v-model="isPublished"></b-switch>
    </b-field>

    <b-field label="Published At Date">
      <b-datepicker
        inline
        :disabled="!isPublished"
        v-model="publishedAtDate"
        placeholder="Click to select...">

        <button class="button is-primary"
          @click.prevent="publishedAtDate = new Date()">
          <b-icon icon="calendar"></b-icon>
          <span>Today</span>
        </button>
      </b-datepicker>
    </b-field>

    <b-field label="Published At Time">
      <b-timepicker
        inline
        :disabled="!isPublished"
        v-model="publishedAtTime"
        placeholder="Click to select..."
        hour-format="24">

        <button class="button is-primary"
          @click.prevent="publishedAtTime = new Date()">
          <b-icon icon="clock-o"></b-icon>
          <span>Now</span>
        </button>
      </b-timepicker>
    </b-field>

    <b-field label="Type"
      :type="$v.type.$error ? 'is-danger': null"
      :message="typeErrorMessages">
      <b-select v-model="type">
        <option value="Article">Article</option>
        <option value="CV">CV</option>
        <option value="About">About Me</option>
        <option value="AboutSmall">About Me (Short)</option>
      </b-select>
    </b-field>

    <b-field grouped>
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
    </b-field>
  </form>
</template>

<script>
  import moment from 'moment';
  import { required } from 'vuelidate/lib/validators';
  import { mapActions, mapGetters } from 'vuex';

  import JchImageUploader from '@/components/images/Uploader';

  export default {
    name: 'jch-article-form',

    props: {
      article: {
        type: Object,
        default: () => ({}),
      },
    },

    components: {
      JchImageUploader,
    },

    data() {
      const { tags } = this.article;

      return {
        title: this.article.title || '',
        slug: this.article.slug || '',
        content: this.article.content || '',
        tags: tags ? tags.map(tag => tag.name) : [],
        publishedAtDate: moment(this.article.publishedAt).toDate(),
        publishedAtTime: moment(this.article.publishedAt).toDate(),
        type: this.article.type || 'Article',
        isPublished: !!this.article.publishedAt || false,
      };
    },

    computed: {
      ...mapGetters('tags', {
        tagList: 'list',
      }),

      titleErrorMessages() {
        const messages = [];

        if (this.$v.title.$error) {
          if (!this.$v.title.required) {
            messages.push('Title is required');
          }
        }

        return messages;
      },

      contentErrorMessages() {
        const messages = [];

        if (this.$v.content.$error) {
          if (!this.$v.content.required) {
            messages.push('Content is required');
          }
        }

        return messages;
      },

      typeErrorMessages() {
        const messages = [];

        if (this.$v.type.$error) {
          if (!this.$v.type.required) {
            messages.push('Type is required');
          }
        }

        return messages;
      },
    },

    methods: {
      ...mapActions('tags', {
        fetchTags: 'fetchList',
      }),

      onSubmit() {
        this.$emit('submit', this.serialize());
      },

      onReset() {
        this.$emit('reset');
      },

      serialize() {
        return {
          title: this.title,
          slug: this.slug,
          content: this.content,
          publishedAt: this.isPublished ? moment(this.publishedAtDate).set({
            hour: moment(this.publishedAtTime).get('hour'),
            minute: moment(this.publishedAtTime).get('minute'),
            second: 0,
            millisecond: 0,
          }).toISOString() : null,
          type: this.type,
          tagList: this.tags.join(','),
        };
      },

      fetchData() {
        const config = {
          params: {
            page: {
              size: 100,
            },
          },
        };

        this.$Progress.start();

        return this.fetchTags({ config })
          .then(() => {
            this.$Progress.finish();
          })
          .catch(() => {
            this.$Progress.fail();
          });
      },
    },

    validations: {
      title: {
        required,
      },

      slug: {},

      content: {
        required,
      },

      type: {
        required,
      },
    },

    created() {
      this.fetchData();
    },

    mounted() {
      this.$refs.title.focus();
    },
  };
</script>
