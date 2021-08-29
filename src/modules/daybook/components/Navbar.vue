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

    <h4 class="text-white me-auto my-auto">Hola {{ username }}!</h4>
    <div class="d-flex">
      <button @click="onLogout" class="btn btn-outline-info mx-2">
        <i class="fa fa-sign-out-alt"></i>
      </button>
    </div>
  </nav>
</template>

<script>
import { useRouter } from 'vue-router';
import useAuth from '../../auth/composables/useAuth';

export default {
  setup() {
    const router = useRouter();
    const { username, logout } = useAuth();

    return {
      username,

      onLogout: () => {
        router.push({ name: 'login' });
        logout();
      },
      goToHome: () => {
        router.push({ name: 'Home' });
      },
    };
  },
};
</script>
