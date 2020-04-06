<template>
  <section class="main-layout">
      <header-app></header-app>
    <div class="container-fluid page-body-wrapper">
      <sidebar-app></sidebar-app>
      <div class="main-panel">
        <div class="content-wrapper">
          <router-view />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
export default {
  components: {
    "header-app": Header,
    "sidebar-app": Sidebar
  },
  created() {
  },
  mounted() { 
  }
}
</script>

<style>

</style>