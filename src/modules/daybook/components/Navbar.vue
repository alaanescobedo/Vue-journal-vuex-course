<template>
  <nav class="navbar bg-primary">
    <a @click="goToHome" class="navbar-brand text-white pointer">
      <img
        src="@/assets/logo.png"
        alt="logo"
        class="d-inline-block align-text-top mx-2"
        height="24"
      />
      Daybook
    </a>
    <div class="d-flex">
      <button class="btn btn-outline-info mx-2"><i class="fa fa-sign-out-alt"></i></button>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    goToHome() {
      this.$router.push({ name: 'Home' });
    },
  },
};
</script>
