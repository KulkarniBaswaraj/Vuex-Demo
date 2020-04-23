<template>
  <section id="breadcrumb">
    <h3>{{pageName}}</h3>
  </section>
</template>

<script>
export default {
  data() {
    return {
      pageName: ""
    };
  },
  methods: {
    getPageName(pageName) {
      const names = {
        profile: "My Profile",
        dashboard: "Dashboard"
      };
      return names[pageName] || pageName;
    }
  },
  mounted() {
    this.pageName = this.getPageName(this.$route.name);
  },
  watch: {
    $route: {
      handler() {
        this.pageName = this.getPageName(this.$route.name);
      }
    }
  }
};
</script>

<style>
</style>