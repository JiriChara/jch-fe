<template>
  <nav class="panel">
    <p class="panel-heading">
      Filters
    </p>

    <div class="panel-block">
      <div class="field has-addons">
        <p
          class="control is-expanded has-icon-right has-icon"
          :class="{ 'has-icons-right': searchTerm !== '' }">
          <input
            @keyup.enter="onSearch"
            v-model="searchTerm"
            class="input is-extended"
            type="text"
            placeholder="eg. Ruby">

          <span
            class="icon is-small is-right is-clickable"
            v-if="searchTerm !== ''"
            @click="onSearchClear" >
            <i class="fa fa-times"></i>
          </span>
        </p>

        <p class="control">
          <a class="button is-info"
            @click="onSearch"
            :disabled="searchTerm === ''">
            <i class="fa fa-search"></i>
          </a>
        </p>
      </div>
    </div>

    <jch-loader v-if="!tagList.length && isLoadingTags" class="panel-block" />

    <div v-if="$tags.isAllowed('create')" class="panel-block">
      <router-link class="button" :to="{ name: 'new-tag' }">
        <b-icon pack="fa" icon="plus"></b-icon>

        <span>
          Create Tag
        </span>
      </router-link>
    </div>

    <a
      v-for="tag in tagList"
      @click="onSelectTag(tag.name)"
      :class="{ 'is-active': isTagSelected(tag.name) }"
      class="panel-block">
      <span class="panel-icon" v-if="isTagSelected(tag.name)">
        <i class="fa fa-eraser"></i>
      </span>
      <span class="panel-icon" v-else>
        <i class="fa fa-tag"></i>
      </span>
      {{ tag.name }}
    </a>

    <small class="panel-block" v-show="route.path === '/'">
      Showing {{ articleList.length }} articles of {{ articlesTotal }}
    </small>
  </nav>
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex';

  import articleFilterMixin from '@/mixins/articleFilterMixin';
  import tagsPerimeter from '@/perimeters/tags';

  export default {
    name: 'jch-article-filter',

    mixins: [
      articleFilterMixin,
    ],

    perimeters: [
      tagsPerimeter,
    ],

    computed: {
      ...mapGetters('articles', {
        articleList: 'list',
        articlesTotal: 'total',
      }),

      ...mapGetters('tags', {
        tagList: 'list',
        isLoadingTags: 'isLoading',
      }),

      ...mapState([
        'route',
      ]),
    },

    methods: {
      ...mapActions('tags', {
        fetchTags: 'fetchList',
      }),

      fetchData() {
        const config = {
          params: {
            page: {
              size: 100,
            },
          },
        };

        this.$Progress.start();

        return this.fetchTags({ config })
          .then(() => this.$Progress.finish())
          .catch(() => this.$Progress.fail());
      },
    },

    watch: {
      $route: 'fetchData',
    },

    created() {
      this.fetchData();
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../css/variables';

  .panel-heading {
    color: $theme-color-2;
    font-family: 'Barrio', cursive;
  }
</style>
