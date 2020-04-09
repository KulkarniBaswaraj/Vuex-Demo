<template>
  <section id="forgot-password-page">
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
                    <p class="font-weight-light"> Enter your registered email address </p>
                  <div class="form-group">
                    <input
                      type="text"
                      v-model="email"
                      class="form-control form-control-lg"
                      id="exampleInputEmail1"
                      placeholder="Email"
                    />
                  </div>
                  <div class="mt-3">
                    <button
                      type="button"
                      @click="submit()"
                      class="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn"
                    >Send</button>
                  </div>

                  <div class="text-center mt-4 font-weight-light">
                    Do you password?
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
export default {
  data() {
    return {
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
      }
      this.$store.dispatch("authModule/genResetToken", payload);
    }
  },
  created() {
    localStorage.clear();
  }
};
</script>

<style>
</style>