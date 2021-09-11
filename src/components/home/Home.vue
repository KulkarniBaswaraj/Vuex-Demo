<template>
  <section class="main-layout">
      <header-app></header-app>
    <div class="container-fluid page-body-wrapper">
      <sidebar-app></sidebar-app>
      <div class="main-panel">
        <div class="content-wrapper">
        <breadcrumb-app></breadcrumb-app>

          <router-view />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import breadcrumb from "./breadcrumb/Breadcrumb";

export default {
  components: {
    "header-app": Header,
    "sidebar-app": Sidebar,
    "breadcrumb-app": breadcrumb
  },
  created() {
  },
  mounted() { 
  }
}
</script>

<style>

</style>