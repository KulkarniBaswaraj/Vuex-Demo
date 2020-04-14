<template>
  <section id="sidebar-block">
      <nav class="sidebar sidebar-offcanvas" id="sidebar">
          <ul class="nav">
            <li class="nav-item user-info d-flex">
              <div class="user-circle"> {{userAbbr}} </div>
              <div class="user-name"> {{user.name}}  </div>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="index.html">
                <span class="menu-title">Dashboard</span>
                <i class="mdi mdi-home menu-icon"></i>
              </a>
            </li>
          </ul>
        </nav>
  </section>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("authModule", {
      userAbbr: "getUserAbbr",
      user: "getUserDetails"
    })
  }
}
</script>

<style>

</style>