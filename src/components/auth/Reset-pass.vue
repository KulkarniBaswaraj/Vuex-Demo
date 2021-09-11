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
                  <div class="form-group" :class="{'error': $v.user.password.$error}">
                    <input
                      type="text"
                      v-model="$v.user.password.$model"
                      class="form-control form-control-lg"
                      id="password"
                      placeholder="Password"
                    />
                    <div class="err-box" v-if="$v.user.password.$dirty && $v.user.password.$error">
                      <div v-if="!$v.user.password.required">Password required</div>
                      <div
                        v-else-if="$v.user.password.$invalid"
                      >Password length should be atleast of 4 characters</div>
                    </div>
                  </div>
                  <div class="form-group" :class="{'error': $v.user.confPassword.$error}">
                    <input
                      type="password"
                      v-model="$v.user.confPassword.$model"
                      class="form-control form-control-lg"
                      id="conf-password"
                      placeholder="Confirm Password"
                    />
                    <div
                      class="err-box"
                      v-if="$v.user.confPassword.$dirty && $v.user.confPassword.$error"
                    >
                      <div v-if="!$v.user.confPassword.required">Confirm Password required</div>
                      <div
                        v-else-if="!$v.user.confPassword.sameAsPassword"
                      >Password and Confirm passwords are not same</div>
                    </div>
                  </div>
                  <div class="mt-3">
                    <button
                      :disabled="$v.user.$invalid"
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
import mixins from "../../_utils/mixins";
import { mapState, mapGetters } from "vuex";
import { required, minLength, sameAs } from "vuelidate/lib/validators";

export default {
  mixins: [mixins],
  data() {
    return {
      user: {
        password: "",
        confPassword: "",
        resetPassToken: ""
      }
    };
  },
  validations: {
    user: {
      password: {
        required,
        minlength: minLength(4)
      },
      confPassword: {
        required,
        sameAsPassword: sameAs("password")
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
    resetPass() {
      this.$store.dispatch("authModule/resetPassword", this.user).then(res => {
        if (res.status) {
          this.success("passResetSuc");
          this.user = {};
          this.$v.$reset();
          setTimeout(() => {
            this.$router.push("/login");
          }, 2000);
        } else {
          this.fail(null, res.error);
        }
      });
    }
  },
  created() {
    sessionStorage.clear();
    if (this.$route.params.token) {
      this.user.resetPassToken = this.$route.params.token;
    }
  }
};
</script>

<style></style>
