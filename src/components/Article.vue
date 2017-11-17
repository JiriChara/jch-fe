<template>
  <article>
    <jch-article-header :article="article"></jch-article-header>
    <jch-article-content :article="article"></jch-article-content>
  </article>
</template>

<script>
  import JchArticleContent from '@/components/articles/Content';
  import JchArticleHeader from '@/components/articles/Header';

  export default {
    name: 'jch-article',

    props: {
      article: {
        type: Object,
        required: true,
      },
    },

    components: {
      JchArticleContent,
      JchArticleHeader,
    },
  };
</script>

<style lang="scss" scoped>
  @import '../css/variables';

  article {
    margin-bottom: 2 * $gap;
  }
</style>
