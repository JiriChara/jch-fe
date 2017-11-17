<template>
  <div v-markdown="article.content"></div>
</template>

<script>
  import markdown from '@/directives/markdown';

  export default {
    name: 'jch-article-content',

    directives: {
      markdown,
    },

    props: {
      article: {
        type: Object,
        required: true,
      },
    },
  };
</script>
