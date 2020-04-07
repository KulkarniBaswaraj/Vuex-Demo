<template>
  <section class="loader-wrapper">
    <div id="loader">
      <div class="loader"></div>
      <p>Loading...</p>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style>
.loader-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background: #ffffffc7;
}
#loader{
    margin-top: -6%;
    align-items: center;
    display: flex;
}
.loader + p {
color: purple;
    font-weight: 600;
    font-size: 12px;
    margin-left: 10px;
    margin-bottom: 0px;
    letter-spacing: 1px;
}
.loader {
  border: 3px solid #d4bef3;
  border-radius: 50%;
  border-top: 3px solid purple;
  width: 35px;
  height: 35px;
  -webkit-animation: spin 0.5s linear infinite; /* Safari */
  animation: spin 0.5s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>