<template>
  <v-container fluid pa-3>
    <v-row>

      <!------------------------ SHOUT LIST ----------------------->
      <v-col cols="12" sm="8" v-if="shouts.length > 0" order="1" order-sm="1">
          <!------------------------ SHOUT ITEM ----------------------->
          <v-banner elevation="5"> Recent Shouts </v-banner>
          <v-card class="mb-5" v-for="(shout, i) in shouts" :key="i" elevation="5">
            <AppShoutCard :shout="shout"></AppShoutCard>
          </v-card>
      </v-col>
      <v-banner v-else elevation="5">There are no shouts yet.</v-banner>
      <!------------------------ PROFILE----------------------->
      <v-col  cols="12" sm="4" order="-1" order-sm="2">
        <v-card min-height="0" elevation="300">
          <!------------------------ PROFILE CARD ----------------------->
          <AppProfile v-if="isAuthenticated"> </AppProfile>
          <AppDisabledProfile v-show="!isAuthenticated"></AppDisabledProfile>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
// COMPONENTS
import AppProfile from '@/components/Profile/AppProfile.vue';
import AppDisabledProfile from '@/components/Profile/AppDisabledProfile.vue';
import AppShoutCard from '@/components/Shout/AppShoutCard.vue';
 
export default {
  components: {
    AppShoutCard,
    AppProfile,
    AppDisabledProfile
  },
    data(){
    return {
    user:{},
    isAuthenticated: false,
    shouts: {}
    }
    },
  created() {
      let uri = '//localhost:4000/users';
      this.axios.get(uri).then(response => {
      const isLogin = response.data.filter(login => login.isLogin == true)
      if (isLogin.length > 0){
      this.isAuthenticated = true;
      this.user = isLogin[0];
      }
    });
        let ur = '//localhost:4000/shouts';
        this.axios.get(ur).then(response => {
        this.shouts = response.data;
        this.shouts.userImage = this.user.imageUrl;
          });

    }
};
</script>