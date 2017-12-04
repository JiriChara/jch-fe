<template>
  <b-table :data="tagList" detailed>
    <template slot-scope="props">
      <b-table-column label="ID" numeric>
        {{ props.row.id }}
      </b-table-column>

      <b-table-column label="Name">
        {{ props.row.name }}
      </b-table-column>
    </template>

    <template slot="detail" slot-scope="props">
      <article class="content">
        <jch-tag-form
          :tag="props.row"
          @submit="onSubmit"
          @reset="onReset">
        </jch-tag-form>
      </article>
    </template>

    <template slot="empty">
      <section class="section">
        <div class="content has-text-grey has-text-centered">
          <p>
            <b-icon icon="frown-o" size="is-large"></b-icon>
          </p>

          <p>Nothing here.</p>
        </div>
      </section>
    </template>
  </b-table>
</template>

<script>
  import { mapActions, mapGetters, mapState } from 'vuex';

  import router from '@/router';
  import JchTagForm from '@/components/tags/Form';

  export default {
    name: 'admin-tag-table',

    components: {
      JchTagForm,
    },

    computed: {
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
        updateTag: 'update',
      }),

      fetchData() {
        const config = {
          params: {
            page: {
              size: 999,
            },
          },
        };

        return this.fetchTags({ config })
          .then(() => {
            this.$Progress.finish();
          })
          .catch(() => {
            this.$Progress.fail();
          });
      },

      onSubmit(tag) {
        this.$Progress.start();

        return this.updateTag({ id: tag.slug, data: { tag } })
          .then(() => {
            this.$snackbar.open({
              message: 'Tag was succcessfully updated.',
              type: 'is-success',
            });

            this.$Progress.finish();
          })
          .catch(() => {
            this.$snackbar.open({
              message: 'Cannot update a tag.',
              type: 'is-danger',
            });

            this.$Progress.fail();
          });
      },

      onReset() {
        router.push({ name: 'admin-dashboard' });
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
