<template>
  <div id="app">
    <router-view />
    <app-loader v-if="isLoading"></app-loader>
  </div>
</template>
<script>
import Vue from 'vue';
import Bus from "./_utils/eventbus";
import Loader from "./components/common/Loader";
import Paginate from 'vuejs-paginate';
Vue.component('paginate', Paginate)

export default {
  components: {
    "app-loader": Loader
  },
  data() {
    return {
      refCount: 0,
      isLoading: false
    };
  },
  methods: {
    setLoading(isLoading) {
      if (isLoading) {
        this.refCount++;
        this.isLoading = true;
      } else if (this.refCount > 0) {
        this.refCount--;
        this.isLoading = this.refCount > 0;
      }
    },
    
  },
  mounted() {
    Bus.$on("isLoading", bool => {
      this.setLoading(bool);
    });
  },
  beforeDestroy() {
    Bus.$off("isLoading");
  }
};
</script>
<style>
@import "assets/styles/vendor.bundle.base.css";
@import "assets/styles/materialdesignicons.min.css";
@import "assets/styles/main.css";
@import "assets/styles/custom.css";
@import "assets/styles/theme.css";
</style>
