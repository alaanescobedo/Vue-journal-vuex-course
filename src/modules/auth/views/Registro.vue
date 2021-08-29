<template>
  <span class="login100-form-title p-b-41">
    Registro
  </span>
  <form @submit.prevent="onSubmit" class="login100-form validate-form p-b-33 p-t-5">
    <div class="wrap-input100 validate-input" data-validate="Enter username">
      <input v-model="userForm.name" class="input100" type="text" placeholder="Nombre" required />
      <span class="focus-input100" data-placeholder="&#xe82a;"></span>
    </div>

    <div class="wrap-input100 validate-input" data-validate="Enter password">
      <input v-model="userForm.email" class="input100" type="email" placeholder="Correo" required />
      <span class="focus-input100" data-placeholder="&#xe818;"></span>
    </div>

    <div class="wrap-input100 validate-input" data-validate="Enter password">
      <input
        v-model="userForm.password"
        class="input100"
        type="password"
        placeholder="Contraseña"
        required
      />
      <span class="focus-input100" data-placeholder="&#xe80f;"></span>
    </div>

    <div class="container-login100-form-btn m-t-32">
      <button class="login100-form-btn">
        Crear cuenta
      </button>
    </div>

    <div class="container-login100-form-btn m-t-32">
      <router-link :to="{ name: 'login' }">¿Ya tienes una cuenta?</router-link>
    </div>
  </form>
</template>

<script>
import { ref } from 'vue';
import useAuth from '../composables/useAuth';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

export default {
  setup() {
    const userForm = ref({
      name: '',
      email: '',
      password: '',
    });

    const router = useRouter();
    const { createUser } = useAuth();

    return {
      userForm,

      onSubmit: async () => {
        const { ok, message } = await createUser(userForm.value);

        if (ok) router.push({ name: 'login' });
        else Swal.fire('Error', message, 'error');
      },
    };
  },
};
</script>
