<template>
  <section id="user-mgmt-page">
    <div class="card">
      <div class="card-body">
        <div class="tool-box text-right">
          <!--
          <button type="button" class="btn btn-sm btn-light">
            <i class="mdi mdi-magnify"></i>
            Advance Search
          </button>
          -->
          <button type="button" @click="refresh()" class="btn btn-sm btn-light ml-2">
            <i class="mdi mdi-refresh"></i>
            Refresh
          </button>
        </div>
        <div class="table-responsive">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>DOB</th>
                <th>Phone</th>
                <th>City</th>
                <th>Pin</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(data, i) in usersList" :key="i">
                <td>{{data.name}}</td>
                <td>{{data.email}}</td>
                <td>{{data.dob | moment("DD MMM YYYY")}}</td>
                <td>{{data.phone}}</td>
                <td>{{data.city}}</td>
                <td>{{data.pin}}</td>
              </tr>
            </tbody>
          </table>
          <div class="d-flex justify-content-end">
            <paginate
              :page-count="pn.pageCount"
              :page-range="4"
              :margin-pages="4"
              :click-handler="clickCallback"
              :prev-text="'Prev'"
              :next-text="'Next'"
              :container-class="'pagination'"
              :page-class="'page-item'"
            ></paginate>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      pn: {
        pageCount: 0,
        size: 4
      },
      payload: {
        filter: {},
        page: {
          index: 0,
          size: 4,
          sortBy: "transactionDate",
          sortOrder: "desc"
        }
      }
    };
  },
  computed: {
    ...mapState({
      usersList: state => state.userModule.usersList
    }),
    ...mapGetters("authModule", {
      newUser: "getNewUserDetail"
    })
  },
  methods: {
    ...mapActions({
      getUsers: "userModule/getAllUsers"
    }),
    clickCallback(index) {
      this.payload.page.index = index - 1;
      this.getUsersList();
    },
    calcPage(data) {
      this.pn.pageCount = data.total / this.pn.size;
    },
    getUsersList() {
      this.getUsers(this.payload).then(res => {
        if(res.status) {
          this.calcPage(res.data.page);
        }
      });
    },
    refresh() {
      this.payload.page.index = 0;
      this.getUsersList();
    }
  },
  created() {
    this.getUsersList();
  }
};
</script>

<style>
</style>