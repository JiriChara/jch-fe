<template>
  <div>
    <jch-hero title="Articles"></jch-hero>

    <section class="section">
      <div class="container">
        <jch-content>
          Content...
        </jch-content>
      </div>
    </section>
  </div>
</template>

<script>
  import JchContent from '@/components/layout/Content';
  import JchHero from '@/components/layout/Hero';

  export default {
    name: 'articles',

    components: {
      JchContent,
      JchHero,
    },
  };
</script>
