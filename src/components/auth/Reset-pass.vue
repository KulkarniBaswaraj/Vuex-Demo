<template>
  <section id="signin-page">
    <div class="container-scroller">
      <div class="container-fluid page-body-wrapper full-page-wrapper">
        <div class="content-wrapper d-flex align-items-center auth">
          <div class="row flex-grow">
            <div class="col-lg-4 mx-auto">
              <div class="auth-form-light text-left p-5">
                <div class="brand-logo text-center mb-3">
                  <img src="../../assets/images/logo.svg" />
                </div>
                <form class="pt-3">
                  <div class="form-group">
                    <input
                      type="text"
                      v-model="user.password"
                      class="form-control form-control-lg"
                      id="password"
                      placeholder="Password"
                    />
                  </div>
                  <div class="form-group">
                    <input
                      type="password"
                      v-model="user.confPassword"
                      class="form-control form-control-lg"
                      id="conf-password"
                      placeholder="Confirm Password"
                    />
                  </div>
                  <div class="mt-3">
                    <button
                      type="button"
                      @click="resetPass"
                      class="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn"
                    >Done</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <!-- content-wrapper ends -->
      </div>
      <!-- page-body-wrapper ends -->
    </div>
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  data() {
    return {
      user: {
        password: "",
        confPassword: "",
        resetPassToken: ""
      }
    };
  },
  computed: {
    ...mapState({
      newUser: state => state.authModule.userData,
      token: state => state.authModule.token
    }),
    ...mapGetters('authModule', {
      newUser: 'getNewUserDetail'
    })
  },
  methods: {
    resetPass() {
      this.$store.dispatch("authModule/resetPassword", this.user);
    }
  },
  created() {
    localStorage.clear();
    if(this.$route.params.token) {
      this.user.resetPassToken = this.$route.params.token;
    }
    
  }
};
</script>

<style></style>
