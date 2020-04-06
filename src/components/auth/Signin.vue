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
                      v-model="user.username"
                      class="form-control form-control-lg"
                      id="exampleInputEmail1"
                      placeholder="Username"
                    />
                  </div>
                  <div class="form-group">
                    <input
                      type="password"
                      v-model="user.password"
                      class="form-control form-control-lg"
                      id="exampleInputPassword1"
                      placeholder="Password"
                    />
                  </div>
                  <div class="mt-3">
                    <button
                      type="button"
                      @click="signIn"
                      class="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn"
                    >SIGN IN</button>
                  </div>
                  <div class="my-2 d-flex justify-content-between align-items-center">
                    <div class="form-check">
                      <label class="form-check-label text-muted">
                        <input type="checkbox" class="form-check-input" /> Keep
                        me signed in
                        <i class="input-helper"></i>
                      </label>
                    </div>
                    <a class="auth-link text-black">Forgot password?</a>
                  </div>

                  <div class="text-center mt-4 font-weight-light">
                    Don't have an account?
                    <a @click="nav()" class="text-primary">Create</a>
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
        username: "",
        password: ""
      }
    };
  },
  computed: {
    ...mapState({
      newUser: state => state.authModule.userId,
      token: state => state.authModule.token
    }),
    ...mapGetters('authModule', {
      newUser: 'getNewUserDetail'
    })
  },
  methods: {
    nav() {
      this.$router.push("sign-up");
    },
    signIn() {
      this.$store.dispatch("authModule/login", this.user);
    }
  }
};
</script>

<style></style>
