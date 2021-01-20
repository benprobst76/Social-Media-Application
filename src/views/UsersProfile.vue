<template>
  <v-container fluid pa-3 style="min-height: 100vh;">
    <v-row>

      <!------------------------ SHOUT LIST ----------------------->
      <v-col cols="12" sm="5" v-if="shouts.length > 0" order="1" order-sm="1">
        <v-banner elevation="5"> Your Shouts</v-banner>
          <!------------------------ SHOUT ITEM ----------------------->
          <v-card class="mb-5" v-for="(shout, i) in shouts" :key="i" elevation="5">
            <AppShoutCard :shout="shout" ></AppShoutCard>
          </v-card>
      </v-col>
      <v-banner v-else elevation="5">You haven't posted any shouts.</v-banner>
      <!------------------------ PROFILE ----------------------->
      <v-col cols="12" sm="7" order="-1" order-sm="2" >
          <v-card min-height="300" min-width="150" elevation="0" >
            <AppProfile></AppProfile>
          </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import AppProfile from '@/components/Profile/AppProfile.vue';
import AppShoutCard from '@/components/Shout/AppShoutCard.vue';

export default {
    components: {
        AppProfile,
        AppShoutCard
    },
    data(){
    return {
    user:{},
    shouts: {}
    }
    },
    created() {
      window.scrollTo(0, 0);
      let uri = '//localhost:4000/users';
      this.axios.get(uri).then(response => {
      const isLogin = response.data.filter(login => login.isLogin == true)
      if (isLogin.length > 0){
      this.user = isLogin[0];
      }
      });
        let ur = '//localhost:4000/shouts';
        this.axios.get(ur).then(response => {
        const userShout = response.data.filter(shout => shout.userHandle == this.user.handle)
        this.shouts = userShout;
          });
    }
}
</script>