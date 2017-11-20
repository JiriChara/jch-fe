<template>
  <div>
    <jch-hero :title="title" :subtitle="subtitle"></jch-hero>

    <section class="section">
      <div class="container has-text-centered">
        <img src="../assets/images/why-you-no.png" alt="Not Found!" />
      </div>
    </section>
  </div>
</template>

<script>
  import JchHero from '@/components/layout/Hero';

  export default {
    name: 'not-found',

    components: {
      JchHero,
    },

    data() {
      return {
        title: '404',
        subtitle: '..didn\'t find anything like this',
      };
    },
  };
</script>

<style lang="scss" scoped>
  .section {
    padding-bottom: 0;
  }

  img {
    margin-bottom: -6px;
  }
</style>
