<template>
  <template v-if="entry">
    <div class="entry-title d-flex justify-content-between p-2">
      <div>
        <span class="text-success fs-3 fw-bold">{{ day }}</span>
        <span class="mx-1 fs-3">{{ month }}</span>
        <span class="mx-2 fs-4 fw-light">{{ year }}</span>
      </div>

      <div>
        <input
          type="file"
          @change="onChooseImage"
          ref="imageSelector"
          v-show="false"
          accept="image/png, image/jpeg"
        />

        <button v-if="entry.id" @click="onDeleteEntry" class="btn btn-danger mx-2">
          Delete
          <i class="fa fa-trash-alt"></i>
        </button>
        <button @click="onUploadImage" class="btn btn-primary">
          Upload Photo
          <i class="fa fa-upload"></i>
        </button>
      </div>
    </div>

    <hr />

    <div class="d-flex flex-column px-3 h-75">
      <textarea
        @keydown.ctrl.enter="saveEntry"
        @keydown.ctrl.i="onUploadImage"
        v-model="entry.text"
        placeholder="Que sucedio hoy?"
      ></textarea>
    </div>

    <img
      v-if="entry.picture && !localImage"
      :src="entry.picture"
      alt="entry-picture"
      class="img-thumbnail"
    />

    <img v-if="localImage" :src="localImage" alt="entry-picture" class="img-thumbnail" />
  </template>

  <Fab icon="fa-save" @on:click="saveEntry" />
</template>

<script>
import { defineAsyncComponent } from '@vue/runtime-core';
import { mapActions, mapGetters } from 'vuex';
import getDayMonthYear from '../helpers/getDayMonthYear';
import Swal from 'sweetalert2';
import uploadImage from '../helpers/uploadImage';

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      entry: null,
      localImage: null,
      fileImage: null,
    };
  },
  components: {
    Fab: defineAsyncComponent(() => import('../components/Fab.vue')),
  },
  computed: {
    ...mapGetters('journal', ['getEntryById']),
    day() {
      const { day } = getDayMonthYear(this.entry.date);
      return day;
    },
    month() {
      const { month } = getDayMonthYear(this.entry.date);
      return month;
    },
    year() {
      const { year } = getDayMonthYear(this.entry.date);
      return year;
    },
  },
  methods: {
    ...mapActions('journal', ['updateEntry', 'createEntry', 'deleteEntry']),
    loadEntry() {
      let entry;
      if (this.id === 'new') {
        entry = {
          text: '',
          date: new Date().getTime(),
        };
      } else {
        entry = this.getEntryById(this.id);
        this.localImage = null;
        if (!entry) return this.$router.push({ name: 'no-entry' });
      }
      this.entry = entry;
    },
    async saveEntry() {
      new Swal({
        title: 'Espere por favor',
        allowOutsideClick: false,
      });
      Swal.showLoading();

      const picture = await uploadImage(this.fileImage);
      this.entry.picture = picture;

      if (this.entry.id) {
        //Actualizar entrada
        await this.updateEntry(this.entry);
        Swal.fire('Guardado', 'Entrada actualizada con exito', 'success');
      } else {
        //Crear nueva entrada
        const id = await this.createEntry(this.entry);
        this.$router.push({ name: 'entry', params: { id } });
        Swal.fire('Guardado', 'Entrada registrada con exito', 'success');
      }

      this.fileImage = null;
    },
    async onDeleteEntry() {
      const { isConfirmed } = await Swal.fire({
        title: 'Estas seguro?',
        text: 'Una vez borrado, no se puede recuperar',
        showDenyButton: true,
        confirmButtonText: 'Si, estoy seguro',
      });

      if (isConfirmed) {
        new Swal({
          title: 'Espere por favor',
          allowOutsideClick: false,
        });
        Swal.showLoading();
        await this.deleteEntry(this.entry.id);
        this.$router.push({ name: 'no-entry' });
        Swal.fire('Eliminado', '', 'success');
      }
    },
    onChooseImage(event) {
      const fileImage = event.target.files[0];

      if (!fileImage) {
        this.localImage = null;
        this.fileImage = null;
        return;
      }

      this.fileImage = fileImage;

      const fr = new FileReader();
      fr.onload = () => (this.localImage = fr.result);
      fr.readAsDataURL(fileImage);
    },
    onUploadImage() {
      this.$refs.imageSelector.click();
    },
  },
  created() {
    this.loadEntry();
  },
  watch: {
    id() {
      this.loadEntry();
    },
  },
};
</script>

<style lang="scss" scoped>
textarea {
  font-size: 20px;
  border: none;
  height: 100%;

  &:focus {
    outline: none;
  }
}

img {
  width: 200px;
  position: fixed;
  bottom: 150px;
  right: 20px;
  box-shadow: 0px 5px 10px rgba($color: #000, $alpha: 0.2);
}
</style>
