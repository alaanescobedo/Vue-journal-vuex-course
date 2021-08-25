<template>
  <button @click="$emit('on:click')" class="btn btn-primary">
    <i class="fa fa-2x" :class="icon"></i>
  </button>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: 'fa-plus',
    },
  },
};
</script>

<style lang="scss" scoped>
button {
  align-items: center;
  border-radius: 100%;
  bottom: 20px;
  display: flex;
  height: 40px;
  justify-content: center;
  position: fixed;
  right: 20px;
  width: 40px;
}

i {
  font-size: 20px;
}
</style>
