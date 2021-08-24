<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
  </div>
  <button @click="goToDaybook" class="btn btn-primary">Primary</button>
  <button @click="goToDaybook" class="btn btn-secondary">Secondary</button>
  <button @click="goToDaybook" class="btn btn-success">Success</button>
</template>

<script>
export default {
  name: 'Home',
  components: {},
  methods: {
    goToDaybook() {
      this.$router.push({ name: 'no-entry' });
    },
  },
};
</script>
