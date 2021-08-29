<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
  </div>
  <button @click="goToLogin" class="btn btn-primary">Login</button>
  <button @click="goToDaybook" class="btn btn-primary">Daybook</button>
</template>

<script>
export default {
  name: 'Home',
  components: {},
  data() {
    return {
      numero: 1,
    };
  },
  methods: {
    goToDaybook() {
      this.$router.push({ name: 'no-entry' });
    },
    goToLogin() {
      console.log(this);
      this.$router.push({ name: 'login' });
    },
  },
};
</script>
