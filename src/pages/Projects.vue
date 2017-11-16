<template>
  <div>
    <jch-hero title="Projects"></jch-hero>

    <section class="section">
      <div class="container">
        <jch-content>
          Content

          <p slot="side">
            Custom content
          </p>
        </jch-content>
      </div>
    </section>
  </div>
</template>

<script>
  import JchContent from '@/components/layout/Content';
  import JchHero from '@/components/layout/Hero';

  export default {
    name: 'projects',

    components: {
      JchContent,
      JchHero,
    },
  };
</script>
