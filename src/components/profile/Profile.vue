<template>
  <section id="profile-page">
    <div class="card if-card profile-card">
      <div class="user-icon">
        <i class="mdi mdi-account menu-icon"></i>
      </div>
      <div class="card-body">
        <div class="row mt-2">
          <div class="col-md-4" v-for="(data, index) in Object.keys(userData)" :key="index">
            <div class="user-data">
              <div>{{ getLabels(data) }}</div>
              <div>
                <span v-if="userData[data] && data != 'dob'">{{ userData[data] }}</span>
                <span
                  v-else-if="userData[data] && data == 'dob'"
                >{{ userData[data] | moment("DD MMM YYYY")}}</span>
                <span class="pl-1" v-else>- -</span>
              </div>
            </div>
          </div>
        </div>
        <div class="edit-icon pointer">
          <button class="btn p-0" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i class="mdi mdi-dots-vertical"></i>
          </button>
          <div class="dropdown-menu dropdown-menu-right">
            <button
              class="dropdown-item"
              type="button"
              data-toggle="modal"
              data-target="#editModal"
            >Edit</button>
          </div>
        </div>
      </div>

      <div class="modal fade" id="editModal">
        <div class="modal-dialog modal-md vertical">
          <div class="modal-content">
            <!-- Modal Header -->
            <div class="modal-header">
              <h4 class="modal-title">Edit Profile</h4>
            </div>

            <!-- Modal body -->
            <div class="modal-body">
              <form>
                <div class="form-group" :class="{'error': $v.user.name.$error}">
                  <input
                    type="text"
                    v-model="$v.user.name.$model"
                    class="form-control"
                    placeholder="Name"
                    id="name"
                  />
                  <div class="err-box" v-if="$v.user.name.$dirty && $v.user.name.$error">
                    <div v-if="!$v.user.name.required">name required</div>
                    <div v-else-if="$v.user.name.$invalid">Minimum 4 characters required</div>
                  </div>
                </div>

                <div class="form-group" :class="{'error': $v.user.email.$error}">
                  <input
                    type="email"
                    v-model="$v.user.email.$model"
                    class="form-control"
                    placeholder="Email"
                    id="email"
                    readonly
                  />
                  <div class="err-box" v-if="$v.user.email.$dirty && $v.user.email.$error">
                    <div v-if="!$v.user.email.required">Email required</div>
                    <div v-else-if="$v.user.email.$invalid">Invalid email</div>
                  </div>
                </div>

                <div class="form-group">
                  <datepicker
                    v-model="user.dob"
                    @selected="onDobSelect()"
                    class="form-control"
                    placeholder="DOB"
                    name="uniquename"
                  ></datepicker>
                </div>

                <div class="form-group" :class="{'error': $v.user.phone.$error}">
                  <input
                    type="text"
                    v-model="$v.user.phone.$model"
                    class="form-control"
                    placeholder="Phone"
                    id="phone"
                  />
                  <div class="err-box" v-if="$v.user.phone.$dirty && $v.user.phone.$error">
                    <div v-if="$v.user.phone.$invalid">Enter only numbers</div>
                  </div>
                </div>
                <div class="form-group" :class="{'error': $v.user.city.$error}">
                  <input
                    type="text"
                    v-model="$v.user.city.$model"
                    class="form-control"
                    placeholder="City"
                    id="city"
                  />
                  <div class="err-box" v-if="$v.user.city.$dirty && $v.user.city.$error">
                    <div v-if="!$v.user.city.$invalid">Enter only alphabets</div>
                  </div>
                </div>
                <div class="form-group" :class="{'error': $v.user.pin.$error}">
                  <input
                    type="text"
                    v-model="$v.user.pin.$model"
                    class="form-control"
                    placeholder="Pin"
                    id="pin"
                  />
                  <div class="err-box" v-if="$v.user.pin.$dirty && $v.user.pin.$error">
                    <div v-if="!$v.user.pin.numeric">Enter only numbers</div>
                    <div v-else-if="!$v.user.pin.minLength.$invalid">Invalid Pin</div>
                    <div v-else-if="!$v.user.pin.maxLength.$invalid">Invalid Pin max</div>
                  </div>
                </div>
              </form>
            </div>

            <!-- Modal footer -->
            <div class="modal-footer pl-0 pr-0 pb-0">
              <button type="button" class="btn btn-dark btn-block" data-dismiss="modal">Cancel</button>
              <button
                type="button"
                class="btn btn-gradient-primary btn-block"
                data-dismiss="modal"
                :disabled="$v.$invalid"
                @click="updateUser"
              >Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import mixins from "../../_utils/mixins";
import {
  required,
  minLength,
  maxLength,
  email,
  numeric,
  alpha
} from "vuelidate/lib/validators";
import Datepicker from "vuejs-datepicker";

export default {
  mixins: [mixins],
  components: {
    Datepicker
  },
  data() {
    return {
      userData: {},
      user: {
        name: null,
        email: null,
        dob: null,
        phone: null,
        city: null,
        pin: null
      }
    };
  },
  validations: {
    user: {
      name: {
        required,
        minLength: minLength(4)
      },
      email: {
        required,
        email
      },
      dob: {},
      phone: {
        numeric
      },
      city: {
        alpha
      },
      pin: {
        numeric,
        minLength: minLength(5),
        maxLength: maxLength(6)
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
    updateUser() {
      const payload = this.rmRef(this.user);
      delete payload.email;
      this.$store
        .dispatch("authModule/updateUser", payload)
        .then(res => {
          if (res.status) {
            this.success("updateUser");
            this.initLoad();
          } else {
            this.fail("updateUserFail");
          }
        })
        .catch(e => {
          this.fail("authFail");
        });
    },
    onDobSelect() {
      setTimeout(() => {
        this.user.dob = new Date(this.user.dob).getTime();
      }, 50);
    },
    populateData(dbUser) {
      const keys = Object.keys(this.user);
      keys.forEach(key => {
        if (dbUser[key]) {
          this.user[key] = dbUser[key];
        } else {
          this.user[key] = null;
        }
      });
      this.userData = this.rmRef(this.user);
    },
    getLabels(label) {
      const labels = {
        name: "Name",
        email: "Email",
        dob: "Date of birth",
        phone: "Phone",
        city: "City",
        pin: "Pin"
      };
      return labels[label] || label;
    },
    initLoad() {
      const user = JSON.parse(sessionStorage.getItem("userData"));
      this.populateData(user);
    }
  },
  created() {
    this.initLoad();
  }
};
</script>

<style></style>
