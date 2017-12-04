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

        <div class="field has-addons is-hidden-tablet" v-if="showSearch">
          <p class="control is-expanded has-icon has-icon-right">
            <input class="input"
              v-model="searchTerm"
              type="text"
              placeholder="eg. Ruby"
              @keyup.enter="onSearch" />

            <span
              class="icon is-small is-right is-clickable"
              v-if="searchTerm !== ''"
              @click="onSearchClear" >
              <i class="fa fa-times"></i>
            </span>
          </p>

          <p class="control">
            <button class="button is-info"
              @click.prevent="onSearch"
              :disabled="searchTerm === ''">
              <b-icon icon="search"></b-icon>
              <span>Search</span>
            </button>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import articleFilterMixin from '@/mixins/articleFilterMixin';

  export default {
    name: 'jch-hero',

    mixins: [
      articleFilterMixin,
    ],

    props: {
      title: {
        type: String,
        required: false,
      },

      subtitle: {
        type: String,
        required: false,
      },

      showSearch: {
        type: Boolean,
        default: false,
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../css/variables';

  .hero {
    background-color: $theme-color-2;

    h1 {
      color: $white;
    }

    .subtitle {
      color: $theme-color-5;
    }
  }
</style>
