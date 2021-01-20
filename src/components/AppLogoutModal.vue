<template>
  <div>
    <!--------------------- LOGOUT BUTTON ----------------------->
    <v-btn @click.stop="dialog = true" fab small elevation="0" color="#32BCC3" dark>
      <v-icon>{{svg.logout}}</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" max-width="290" >
      <v-card>
        <v-card-title class="headline"></v-card-title>
        <v-card-text>
            Are you sure you want to log out?
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="cyan darken-1" text @click="dialog = false" >
            No
          </v-btn>
          <v-btn color="cyan darken-1" text @click="logout" >
            Yes
          </v-btn>
        </v-card-actions>
        
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
// SVG ICONS
import { mdiExitToApp } from '@mdi/js';
export default {

  data() {
    return {
      dialog: false,
      svg: {
        logout: mdiExitToApp,
      },
      user: {},
    }
  },
  methods: {
      logout() {
        this.user.isLogin = false;
         let uri = `http://localhost:4000/users/update/${this.user._id}`;
          this.axios.post(uri, this.user).then(() => {
            this.dialog = false
            this.$router.push('/login')
          })
      }
  },
    created() {
      let uri = '//localhost:4000/users';
      this.axios.get(uri).then(response => {
      const isLogin = response.data.filter(login => login.isLogin == true)
      if (isLogin.length > 0){
      this.user = isLogin[0];
      }
      });
    }
}
</script>