<template>
  <div id="result">
    <h1>Result Component</h1>
    <div>
      <button class="btn btn-primary" @click="getUsers">Users</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "result",
  data() {
    return {
      careerData: []
    };
  },
  methods: {
    getUsers() {
      fetch("http://localhost:3000/users-list")
        .then(response => response.json())
        .then(commits => console.log(commits));
    }
  }
};
</script>

<style></style>
