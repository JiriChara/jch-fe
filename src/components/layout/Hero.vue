<template>
  <section class="hero">
    <div class="hero-body">
      <div class="container">
        <h1 class="title" v-show="title">
          {{ title }}
        </h1>

        <h2 class="subtitle" v-show="subtitle">
          {{ subtitle }}
        </h2>

        <slot />
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'jch-hero',

    props: {
      title: {
        type: String,
        required: false,
      },

      subtitle: {
        type: String,
        required: false,
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../css/variables';
  @import '~bulma';

  .hero {
    background-color: $theme-color-2;

    h1 {
      color: $white;
    }
  }
</style>
