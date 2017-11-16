<template>
  <article>
    <jch-article-header :article="article"></jch-article-header>
    <p>{{ article.content }}</p>
  </article>
</template>

<script>
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
      JchArticleHeader,
    },
  };
</script>
