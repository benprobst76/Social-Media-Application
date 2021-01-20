<template>
    <v-app-bar app class="primario" elevation="0" dark>

        <!--------------------------- NAVBAR TITLE ---------------------------->
        <v-toolbar-title class="headline text-uppercase hover" @click="$router.push('/')">
            <span>SHOUT</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        

        <!--------------------------- POST BUTTON/MODAL ---------------------------->
        <AppPostShout v-if="isAuthenticated"></AppPostShout>
        <v-spacer></v-spacer>
        <!--------------------------- HOME BUTTON ---------------------------->
        <v-btn exact to="/" class="mr-2" elevation="0" color="#32BCC3" fab small>
            <v-icon>{{svg.home}}</v-icon>
        </v-btn>
        <!--------------------------- USER BUTTON ---------------------------->
        <v-btn v-if="isAuthenticated" exact to="/user" class="mr-2" elevation="0" color="#32BCC3" fab small>
            <v-icon>{{svg.profile}}</v-icon>
        </v-btn>

        <!--------------------------- LOGOUT BUTTON MODAL ---------------------------->
        <AppLogoutModal v-if="isAuthenticated"></AppLogoutModal>


        <!--------------------------- LOGIN/SIGNUP BUTTONS ---------------------------->
        <div v-if="!isAuthenticated" class="center">
            <v-btn exact to="/login" elevation="0" fab color="#32BCC3" small class="mr-2">
                <v-icon>{{svg.login}}</v-icon>
            </v-btn>
            
            <v-btn exact to="/signup" elevation="0" fab color="#32BCC3" small>
                <v-icon>{{svg.logout}}</v-icon>
            </v-btn>
        </div>

    </v-app-bar>
</template>

<script>
// COMPONENTS
import AppPostShout from '@/components/AppPostShout.vue';
import AppLogoutModal from '@/components/AppLogoutModal.vue';

//SVG ICONS
import { mdiAccountPlusOutline, mdiHome, mdiLogin, mdiAccount } from '@mdi/js';
export default {
    components: {
        AppPostShout,
        AppLogoutModal
    },
    data: () => ({
        svg: {
            home: mdiHome,
            login: mdiLogin,
            logout: mdiAccountPlusOutline,
            profile: mdiAccount
        },
        isAuthenticated: false
    }),
    created() {
      let uri = '//localhost:4000/users';
      this.axios.get(uri).then(response => {
      const isLogin = response.data.filter(login => login.isLogin == true)
      if (isLogin.length > 0){
      this.isAuthenticated = true;
      }
    });
    }
}
</script>