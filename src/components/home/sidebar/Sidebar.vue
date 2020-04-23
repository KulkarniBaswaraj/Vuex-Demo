<template>
  <section id="sidebar-block">
    <nav class="sidebar sidebar-offcanvas" id="sidebar">
      <ul class="nav">
        <li class="nav-item user-info d-flex">
          <div class="user-circle">{{userAbbr}}</div>
          <div class="user-name">{{user.name}}</div>
        </li>

        <li class="nav-item" 
          v-for="(menu, index) in menus" 
          :key="index" 
          >
          <router-link :to="menu.path">
            <a class="nav-link">
              <span class="menu-title">{{menu.name}}</span>
              <i :class="`mdi ${menu.icon} menu-icon`"></i>
            </a>
          </router-link>
        </li>
        
      </ul>
    </nav>
  </section>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      menus: [
        {
          path: "/home/dashboard",
          name: "Dashboard",
          icon: "mdi-home"
        },
        {
          path: "/home/my-profile",
          name: "My Profile",
          icon: "mdi-account"
        }
      ]
    };
  },
  computed: {
    ...mapState({
      toggle: state => state.authModule.toggleMenu
    }),
    ...mapGetters("authModule", {
      userAbbr: "getUserAbbr",
      user: "getUserDetails"
    })
  }
};
</script>

<style>
</style>