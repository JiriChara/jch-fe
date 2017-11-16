<template>
  <div v-if="article" class="content">
    <router-link :to="articleLink">
      <h1 class="title"><span v-html="randomMusicSymbol"></span> {{ article.title }}</h1>
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

      randomMusicSymbol() {
        const items = [
          '&#9833;',
          '&#9834;',
          '&#9835;',
          '&#9836;',
          '&#9837;',
          '&#9838;',
          '&#9839;',
          '&#x1D106;',
          '&#x1D107;',
          '&#119083;',
          '&#119070;',
          '&#119074;',
          '&#127932;',
        ];

        return items[Math.floor(Math.random() * items.length)];
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../css/variables';

  h1 {
    color: $theme-color-2;
    border-bottom: 2px solid $theme-color-2;
    font-family: 'Barrio', cursive;

    span {
      color: $theme-color-3;
    }
  }
</style>
