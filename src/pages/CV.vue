<template>
  <div>
    <jch-hero :title="title" :subtitle="subtitle"></jch-hero>

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
    name: 'about',

    components: {
      JchContent,
      JchHero,
    },

    data() {
      return {
        title: 'Curriculum Vitae',
        subtitle: '..in case of offers',
      };
    },
  };
</script>
