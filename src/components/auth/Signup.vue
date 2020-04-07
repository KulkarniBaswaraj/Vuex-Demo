<template>
  <section id="signup-page">
    <div class="container-scroller">
      <div class="container-fluid page-body-wrapper full-page-wrapper">
        <div class="content-wrapper d-flex align-items-center auth">
          <div class="row flex-grow">
            <div class="col-lg-4 mx-auto">
              <div class="auth-form-light text-left p-5">
                <div class="brand-logo text-center">
                  <img src="../../assets/images/logo.svg" />
                </div>
                <!-- <h4>New here?</h4> -->
                <h6
                  class="font-weight-light text-center"
                >Signing up is easy. It only takes a few steps</h6>
                <form class="pt-3">
                  <div class="form-group">
                    <input
                      type="text"
                      v-model="user.name"
                      class="form-control form-control-lg"
                      id="exampleInputUsername1"
                      placeholder="Name"
                    />
                  </div>
                  <div class="form-group">
                    <input
                      type="email"
                      v-model="user.email"
                      class="form-control form-control-lg"
                      id="exampleInputEmail1"
                      placeholder="Email"
                    />
                  </div>
                  <div class="form-group">
                    <input
                      type="password"
                      v-model="user.password"
                      class="form-control form-control-lg"
                      id="password"
                      placeholder="Password"
                    />
                  </div>
                  <div class="mb-4">
                    <div class="form-check">
                      <label class="form-check-label text-muted">
                        <input type="checkbox" class="form-check-input" /> I
                        agree to all Terms &amp; Conditions
                        <i
                          class="input-helper"
                        ></i>
                      </label>
                    </div>
                  </div>
                  <div class="mt-3">
                    <a
                      class="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn"
                      @click="signUp()"
                    >SIGN UP</a>
                  </div>
                  <div class="text-center mt-4 font-weight-light">
                    Already have an account?
                    <a @click="nav()" class="text-primary">Login</a>
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
        name: null,
        email: null,
        password: null
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
    nav() {
      this.$router.push("/");
    },
    signUp() {
      this.$store.dispatch("authModule/signUp", this.user);
    }
  }
};
</script>

<style></style>
