<template>
  <div id="app">
    <router-view />
    <app-loader v-if="isLoading"></app-loader>
  </div>
</template>
<script>
import Bus from './eventbus';
import Loader from "./components/common/Loader";
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
    }
  },
  mounted() {
    Bus.$on('isLoading', bool => {
      this.setLoading(bool);
    });
  },
  beforeDestroy() {
    Bus.$off('isLoading');
  }
};
</script>
<style>
@import "assets/styles/materialdesignicons.min.css";
@import "assets/styles/vendor.bundle.base.css";
@import "assets/styles/main.css";
@import "assets/styles/custom.css";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
