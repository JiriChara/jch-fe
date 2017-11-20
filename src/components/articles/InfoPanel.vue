<template>
  <nav class="level">
    <div class="level-item level-left" v-if="article.tags.length">
      <span class="panel-icon is-small">
        <i class="fa fa-tags"></i>
      </span>

      <span>
        <span v-for="tag in article.tags" :key="tag.id">
          <span v-if="route.query.byTag === tag.name" class="selected-tag" @click="onSelectTag(tag.name)">
            <span> {{ tag.name }}</span><span v-if="article.tags[article.tags.length - 1] !== tag">,</span>
          </span>

          <span v-else>
            <a @click="onSelectTag(tag.name)"> {{ tag.name }}</a><span v-if="article.tags[article.tags.length - 1] !== tag">,</span>
          </span>
        </span>
      </span>
    </div>

    <div class="level-item level-left">
      <span class="panel-icon is-small">
        <i class="fa fa-clock-o"></i>
      </span>
      <span>{{ articlePublishedAt }}</span>
    </div>
  </nav>
</template>

<script>
  import moment from 'moment';
  import { mapState } from 'vuex';

  import articleFilterMixin from '@/mixins/articleFilterMixin';

  export default {
    name: 'jch-article-info-panel',

    mixins: [
      articleFilterMixin,
    ],

    props: {
      article: {
        type: Object,
        required: true,
      },
    },

    computed: {
      ...mapState([
        'route',
      ]),

      articlePublishedAt() {
        return moment(this.article.publishedAt).fromNow();
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../css/variables';

  .level-item {
    color: $theme-color-5;

    .panel-icon {
      color: $theme-color-3;
    }
  }

  .selected-tag {
    font-weight: bold;
    cursor: pointer;
  }
</style>
