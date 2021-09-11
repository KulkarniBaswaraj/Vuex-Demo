<template>
  <section id="forgot-password-page">
    <div class="container-scroller">
      <div class="container-fluid page-body-wrapper full-page-wrapper">
        <div class="content-wrapper d-flex align-items-center auth">
          <div class="row flex-grow">
            <div class="col-lg-4 mx-auto">
              <div class="auth-form-light text-left p-5">
                <div class="brand-logo text-center mb-3">
                  <img src="../../assets/images/logo.png" />
                </div>
                <form class="pt-1 text-center" v-if="!isSuccess">
                  <p class="font-weight-light text-center">Enter your registered email address</p>
                  <div class="form-group" :class="{'error': $v.email.$error}">
                    <input
                      type="text"
                      v-model="$v.email.$model"
                      class="form-control form-control-lg"
                      id="exampleInputEmail1"
                      placeholder="Email"
                    />
                    <div class="err-box" v-if="$v.email.$dirty && $v.email.$error">
                      <div v-if="!$v.email.required">Email required</div>
                      <div v-else-if="$v.email.$invalid">Invalid email</div>
                    </div>
                  </div>
                  <div class="mt-3">
                    <button
                      :disabled="$v.email.$invalid"
                      type="button"
                      @click="submit()"
                      class="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn"
                    >Send</button>
                  </div>

                  <div class="text-center mt-4 font-weight-light">
                    Do you remember password?
                    <a @click="nav()" class="text-primary">Login</a>
                  </div>
                  
                </form>
                <div class="pt-3" v-if="isSuccess">
                  <div class="msg-box">
                    <div>
                      <i class="mdi mdi-check-circle-outline"></i>
                    </div>A password reset message was sent to your email address. Please click the
                    link to reset your password.
                  </div>
                  <button @click="nav()"
                    class="btn btn-block btn-gradient-primary font-weight-medium auth-form-btn mt-4"
                  >Back to Login</button>
                </div>
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
import { email, required } from "vuelidate/lib/validators";

export default {
  mixins: [mixins],
  data() {
    return {
      isSuccess: false,
      email: null
    };
  },
  computed: {},
  methods: {
    nav() {
      this.$router.push("login");
    },
    submit() {
      const payload = {
        email: this.email
      };
      this.$store
        .dispatch("authModule/genResetToken", payload)
        .then(res => {
          if (res.status == 1) {
            this.isSuccess = true;
            this.success("resetTokenSuc");
          } else {
            this.fail(null, res.error);
          }
        })
        .catch(e => {
          this.fail("resetTokenfail");
        });
    }
  },
  validations: {
    email: {
      required,
      email
    }
  },
  created() {
    sessionStorage.clear();
  }
};
</script>

<style>
.mdi-check-circle-outline {
  font-size: 28px;
}
.msg-box {
  text-align: center;
  background: #dbffdb;
  padding: 13px;
  border-radius: 2px;
  line-height: 20px;
  color: #009688;
  font-size: 15px;
  font-weight: 100;
}
</style>