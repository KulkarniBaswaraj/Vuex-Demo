<template>
  <section id="header-s">
    <nav class="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
      <div
        class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center"
      >
        <a class="navbar-brand brand-logo" href="index.html">
          <img src="../../../assets/images/logo.svg" alt="logo" />
        </a>
        <a class="navbar-brand brand-logo-mini" href="index.html">
          <img src="../../../assets/images/logo-mini.svg" alt="logo" />
        </a>
      </div>
      <div class="navbar-menu-wrapper d-flex align-items-stretch">
        <ul class="navbar-nav navbar-nav-right">
          <li class="nav-item d-lg-block" @click="logout">
            <a class="nav-link">
              <i class="mdi mdi-logout"></i>
            </a>
          </li>
        </ul>
        <button
          class="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
          type="button"
          data-toggle="offcanvas"
        >
          <span class="mdi mdi-menu" @click="toggleMenu()"></span>
        </button>
      </div>
    </nav>
  </section>
</template>

<script>
import mixins from "../../../_utils/mixins";
import { mapState, mapGetters } from "vuex";

export default {
  mixins: [mixins],
  data() {
    return {
      info: {
        title: "",
        text: "Are you sure want to Logout ?"
      }
    };
  },
  computed: {
    ...mapState({
      toggle: state => state.authModule.toggleMenu
    })
  },
  methods: {
    toggleMenu() {
      this.$store.commit('authModule/toggle');
    },
    logout() {
      this.swalConfirm(this.info).then(res => {
        if (res.value) {
          this.$store.dispatch("authModule/logout");
        }
      });
    }
  }
};
</script>

<style>
</style>