<template>
  <section id="signup-page">
    <div class="container-scroller">
      <div class="container-fluid page-body-wrapper full-page-wrapper">
        <div class="content-wrapper d-flex align-items-center auth">
          <div class="row flex-grow">
            <div class="col-lg-4 mx-auto">
              <div class="auth-form-light text-left p-5">
                <div class="brand-logo text-center">
                  <img src="../../assets/images/logo.png" />
                </div>
                <!-- <h4>New here?</h4> -->
                <h6
                  class="font-weight-light text-center"
                >Signing up is easy. It takes only few steps</h6>
                <form class="pt-3">
                  <div class="form-group" :class="{'error': $v.user.name.$error}">
                    <input
                      type="text"
                      v-model="$v.user.name.$model"
                      class="form-control form-control-lg"
                      id="exampleInputUsername1"
                      placeholder="Name"
                    />
                    <div class="err-box" v-if="$v.user.name.$dirty && $v.user.name.$error">
                      <div v-if="!$v.user.name.required">name required</div>
                      <div v-else-if="$v.user.name.$invalid">Minimum 4 characters required </div>
                    </div>
                  </div>
                  <div class="form-group" :class="{'error': $v.user.email.$error}">
                    <input
                      type="email"
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
                      id="password"
                      placeholder="Password"
                    />
                    <div class="err-box" v-if="$v.user.password.$dirty && $v.user.password.$error">
                      <div v-if="!$v.user.password.required">Password required</div>
                      <div v-else-if="$v.user.password.$invalid"> Password length should be atleast of 4 characters </div>
                    </div>
                  </div>
                  <div class="mb-4">
                    <div class="form-check">
                      <label class="form-check-label text-muted" @click="hasCheckdTc = !hasCheckdTc">
                        <input type="checkbox" class="form-check-input" :checked="hasCheckdTc" /> I
                        agree to all Terms &amp; Conditions
                        <i
                          class="input-helper"
                        ></i>
                      </label>
                    </div>
                  </div>
                  <div class="mt-3">
                    <button
                      :disabled="$v.user.$invalid || !hasCheckdTc"
                      class="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn"
                      @click="signUp()"
                    >SIGN UP</button>
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
import { required, minLength, email } from "vuelidate/lib/validators";
import { mapState, mapGetters } from 'vuex';
import mixins from "../../_utils/mixins";
export default {
  mixins: [mixins],
  data() {
    return {
      user: {
        name: null,
        email: null,
        password: null,
        dob: null,
        phone: null,
        city: null,
        pin: null
      },
      hasCheckdTc: false
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
  validations: {
    user: {
      name: {
        required,
        minlength: minLength(4)
      },
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
  methods: {
    nav() {
      this.$router.push("/");
    },
    signUp() {
      this.$store.dispatch("authModule/signUp", this.user).then(res => {
        if(res.status == 1) {
          this.user = {};
          this.$v.$reset();
          this.success('userRegSucc');
        } else {
          this.fail(null, res.error);
        }
      }).catch(e => {

      });
    }
  },
};
</script>

<style></style>
