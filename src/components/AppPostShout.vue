<template>
  <v-dialog v-model="dialog" persistent max-width="600px">

    <!------------------------ POST BUTTON ----------------------->
    <template v-slot:activator="{ on }">
      <v-tooltip bottom>
          <template v-slot:activator="{ on: tooltip }">
            <v-btn v-on="{...on, ...tooltip}" fab small elevation="0" color="2c003e" dark>
                <v-icon>{{svg.pencil}}</v-icon>
            </v-btn>
          </template>
        <span>Post a shout</span>
      </v-tooltip>
    </template>
    <!------------------------ POST FORM ----------------------->
    <v-card>
      <v-card-title class="primario white--text">
        Post a shout
      </v-card-title>
      <!------------------------ FORM COMPONENT ----------------------->
      <AppPostForm @click="dialog = false"></AppPostForm>
      <!------------------------ FORM COMPONENT ----------------------->
    </v-card>
  </v-dialog>
</template>
<script>
import AppPostForm from '@/components/AppPostForm.vue';
import {mdiPencilRemoveOutline } from '@mdi/js';
export default {
  components: {
    AppPostForm
  },
  data: () => ({
      dialog: false,
      loadingImport: false,
      svg: {
          pencil: mdiPencilRemoveOutline
      }
  })
}
</script>