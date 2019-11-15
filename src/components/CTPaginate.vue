<template>
  <div>
    <slot :page="page" :results="results"></slot>

    <div class="flex justify-between">
      <div class="self-center">
        <slot name="perPage" :perPage="perPage">
          <label for="perPage">Show per Page</label>
          <select id="perPage" v-model="perPage" name="perPage">
            <option :value="5">5</option>
            <option :value="10">10</option>
            <option :value="20">20</option>
            <option :value="50">50</option>
          </select>
        </slot>
      </div>

      <div class="self-center">
        <paginate
          v-model="page"
          :page-count="pageCount"
          :page-range="3"
          :margin-pages="2"
          prev-text="Prev"
          next-text="Next"
          container-class="ct-pagination"
          page-class="ct-page-item"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Fuse from "fuse.js";

const get = (object: any, path: any, defaultValue = "") => {
  if (typeof path === "string") path = path.split(".");
  return path.reduce(
    (xs: any, x: any) => (xs && xs[x] ? xs[x] : defaultValue),
    object
  );
};

export default Vue.extend({
  name: "CtPaginate",
  components: {
    paginate: () => import("vuejs-paginate")
  },
  props: {
    value: {
      required: true,
      type: Array
    },
    search: {
      type: String,
      default: ""
    },
    searchOptions: {
      type: Object,
      default: () => ({})
    },
    advancedSearch: {
      type: Object,
      default: () => ({})
    },
    exact: {
      type: Boolean,
      default: true
    },
    startPage: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      page: 1,
      perPage: 10
    };
  },
  computed: {
    searchResults(): any[] {
      if (this.search === "") {
        return this.take(this.value);
      }

      const fuse = new Fuse(this.value, this.searchOptions);

      return this.take(fuse.search(this.search));
    },
    results(): any[] {
      const advancedKeys = Object.keys(this.advancedSearch);

      if (advancedKeys.length === 0) {
        return this.searchResults;
      }

      return this.take(
        this.value.filter(value => {
          const filtered = advancedKeys.filter(key => {
            return (
              get(value, key, "__undefined__") === this.advancedSearch[key]
            );
          });

          return this.exact
            ? filtered.length === advancedKeys.length
            : filtered.length > 0;
        })
      );
    },
    pageCount(): any {
      return Math.ceil(this.value.length / this.perPage);
    }
  },
  beforeMount() {
    this.page = this.startPage;
  },
  methods: {
    take(list: any) {
      const start = (this.page - 1) * this.perPage;
      return list.slice(start, start + this.perPage);
    }
  }
});
</script>
