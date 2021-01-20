<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <!-------------------------  EDIT PROFILE BUTTON ------------------>
        <template v-slot:activator="{ on }">
            <v-btn color="#32BCC3" v-on="on" elevation="0" dark>
                <v-icon left>{{svg.pencil}}</v-icon>
                Edit Profile
            </v-btn>
        </template>

      <v-card>
        <v-card-title class="primario white--text">
          Edit your profile
        </v-card-title>

        <!-------------------------  EDIT FORM COMPONENT ------------------->
        <AppEditForm @click="dialog = false"></AppEditForm>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import AppEditForm from '@/components/Profile/AppEditForm.vue'
import { mdiPencil } from '@mdi/js';
export default {
  components: {
        AppEditForm
  },
  data: () => ({
      dialog: false,
      svg: {
          pencil: mdiPencil
      },
      user: {}
  }),
    created() {
    let uri = '//localhost:4000/users';
   this.axios.get(uri).then(response => {
    const isLogin = response.data.filter(login => login.isLogin == true)
    this.user = isLogin[0];
   });
  }
}
</script>