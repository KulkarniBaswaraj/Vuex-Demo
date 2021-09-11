<template>
  <section id="signin-page">
    <div class="container-scroller">
      <div class="container-fluid page-body-wrapper full-page-wrapper">
        <div class="content-wrapper d-flex align-items-center auth">
          <div class="row flex-grow">
            <div class="col-lg-4 mx-auto">
              <div class="auth-form-light text-left p-5">
                <div class="brand-logo text-center mb-3">
                  <img src="../../assets/images/logo.png" />
                </div>
                <form class="pt-3">
                  <div class="form-group" :class="{'error': $v.user.email.$error}">
                    <input
                      type="text"
                      v-model="$v.user.email.$model"
                      class="form-control form-control-lg"
                      id="exampleInputEmail1"
                      placeholder="Email"
                    />
                    <div class="err-box" v-if="$v.user.email.$dirty && $v.user.email.$error">
                      <div v-if="!$v.user.email.required">Email required</div>
                      <div v-else-if="$v.user.email.$invalid">Invalid email</div>
                    </div>
                  </div>
                  <div class="form-group" :class="{'error': $v.user.password.$error}">
                    <input
                      type="password"
                      v-model="$v.user.password.$model"
                      class="form-control form-control-lg"
                      id="exampleInputPassword1"
                      placeholder="Password"
                    />
                    <div class="err-box" v-if="$v.user.password.$dirty && $v.user.password.$error">
                      <div v-if="!$v.user.password.required">Password required</div>
                      <div v-else-if="$v.user.password.$invalid">Invalid password</div>
                    </div>
                  </div>
                  <div class="mt-3">
                    <button
                      type="button"
                      :disabled="$v.user.$invalid"
                      @click="signIn()"
                      class="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn"
                    >SIGN IN</button>
                  </div>

                  <div class="text-center mt-3 font-weight-light">
                    Don't have an account?
                    <a @click="nav('sign-up')" class="text-primary">Create</a>
                  </div>

                  <div class="mt-3 d-flex justify-content-center align-items-center">
                    <a
                      @click="nav('forgot-password')"
                      class="auth-link text-primary"
                    >Forgot password?</a>
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
import { mapState, mapGetters } from "vuex";
import mixins from "../../_utils/mixins";
import { required, minLength, email } from "vuelidate/lib/validators";

export default {
  mixins: [mixins],
  data() {
    return {
      user: {
        email: "",
        password: ""
      }
    };
  },
  validations: {
    user: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(4)
      }
    }
  },
  computed: {
    ...mapState({
      newUser: state => state.authModule.userData,
      token: state => state.authModule.token
    }),
    ...mapGetters("authModule", {
      newUser: "getNewUserDetail"
    })
  },
  methods: {
    nav(routeName) {
      this.$router.push(routeName);
    },
    signIn(form) {
      this.$store
        .dispatch("authModule/login", this.user)
        .then(res => {
          if (res.status) {
            this.success("authSuccess");
          } else {
            this.fail("authFail");
          }
        })
        .catch(e => {
          this.fail("authFail");
        });
    }
  },
  created() {
    sessionStorage.clear();
  }
};
</script>

<style></style>
