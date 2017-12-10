<template>
  <div class="card">
    <div class="card-image">
      <figure class="image is-4by3" v-if="project.image.url">
        <a :href="project.url">
          <img :src="project.image.url" alt="Image" />
        </a>
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <a :href="project.url" class="title">{{ project.name }}</a>
        </div>
      </div>

      <div class="content" v-markdown="project.description"></div>
    </div>
  </div>
</template>

<script>
  import markdown from '@/directives/markdown';

  export default {
    name: 'jch-project-card',

    props: {
      project: {
        type: Object,
        required: true,
      },
    },

    directives: {
      markdown,
    },
  };
</script>

<style lang="scss" scoped>
  .card {
    height: 100%;
  }
</style>
