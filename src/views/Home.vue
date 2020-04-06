<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <result></result>
    <another></another>

    <div class="row">
      <div class="col-md-12">
        <div class="btn btn-primary">Increment</div>
        <div class="btn btn-warning ml-2">Decrement</div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import result from "@/components/result.vue";
import another from "@/components/another.vue";

export default {
  name: "Home",
  components: {
    // HelloWorld,
    result,
    another
  },
  data() {
    return {};
  }
};
</script>
