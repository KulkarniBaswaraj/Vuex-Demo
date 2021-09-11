<template>
  <section id="header-s">
    <nav class="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
      <div
        class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center"
      >
        <a class="navbar-brand brand-logo" @click="nav('/home')">
          <img src="../../../assets/images/logo.png" alt="logo" />
        </a>
        <a class="navbar-brand brand-logo-mini" @click="nav('/home')">
          <img src="../../../assets/images/logo-mini.png" alt="logo" />
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
          <span class="mdi mdi-menu" id="mini-menu"></span>
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
  },
  methods: {
    nav(routeName) {
      if(this.$route.name != 'dashboard') {
        this.$router.push(routeName);
      }
    },
    logout() {
      this.swalConfirm(this.info).then(res => {
        if (res.value) {
          this.$store.dispatch("authModule/logout");
        }
      });
    },
    detectClick() {
      const sidebar = document.getElementById("sidebar");
      if (window.innerWidth < 992 && sidebar) {
        window.addEventListener("click", function(e) {
          const menu = document.getElementById("mini-menu");
          if (sidebar.contains(e.target) || e.target == menu) {
            if (e.target == menu) {
              if (sidebar.classList.contains("active")) {
                sidebar.classList.remove("active");
              } else {
                sidebar.classList.add("active");
              }
            }
          } else {
            if (sidebar.classList.contains("active")) {
              sidebar.classList.remove("active");
            }
          }
        });
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.detectClick();
    });
  },
  watch: {
    $route: {
      handler() {
        const sidebar = document.getElementById("sidebar");
        if (sidebar && window.innerWidth < 992) {
          if (sidebar.classList.contains("active")) {
            sidebar.classList.remove("active");
          }
        }
      }
    }
  },

};
</script>

<style>
</style>