<template>
  <div v-if="article" class="content">
    <router-link :to="articleLink">
      <h1 class="title">
        <b-icon icon="hashtag"></b-icon>
        <span>{{ article.title }}</span>
      </h1>
    </router-link>

    <jch-article-info-panel :article="article">
    </jch-article-info-panel>
  </div>
</template>

<script>
  import JchArticleInfoPanel from '@/components/articles/InfoPanel';

  export default {
    name: 'jch-article-header',

    props: {
      article: {
        type: Object,
        required: true,
      },
    },

    components: {
      JchArticleInfoPanel,
    },

    computed: {
      articleLink() {
        return {
          name: 'article',
          params: {
            slug: this.article.slug,
          },
        };
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../css/variables';

  .content {
    h1 {
      color: $theme-color-2;
      border-bottom: 2px solid $theme-color-2;
      font-family: 'Barrio', cursive;
      text-shadow: 4px 4px 4px #aaa;

      .icon {
        color: $theme-color-3;
        font-size: 20px;
      }
    }
  }
</style>
