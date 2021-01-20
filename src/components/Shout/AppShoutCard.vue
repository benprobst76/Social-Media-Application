<template>
  <div max-height="800" max-width="800" class="mx-auto pa-3">
    <v-row  v-if="shout">
      
      <!--------------------------- SHOUT IMAGE -------------------------->
      <v-col offset="1" cols="10" offset-sm="0" sm="3" class="center">
        <v-avatar :size="sizeAvatar">
          <v-img class="card-img" src="@/assets/profile-picture.png"></v-img>
        </v-avatar>
      </v-col>
      <v-col cols="8" sm="8">
        <v-row>
            <!--------------------- SHOUT USER NAME AND DATE ---------------------->
            <v-col cols="8">
                <h2 class="title cyan--text hover" @click="getUser">{{shout.userHandle}}</h2>
                <p class="font-weight-light grey--text text--darken-1 body-2">{{shout.createdAt | day}}</p>
            </v-col>

            <!--------------------------- SHOUT BODY -------------------------->
            <v-col class="text-left" cols="12">
                <div class="font-weight-regular text-truncate">
                    {{shout.body}}
                </div>
            </v-col>

            <v-col cols="8" md="8" class="relative">
                <v-card-actions>
                  
                  <!---------------------- SHOUT LIKE ACTION -------------------->
                  <v-btn text @click="likeShout(isAuthenticated, shout)" small 
                  color="#2c003e">
                      <v-icon left color="red">{{svg.heartOut}}</v-icon>
                      {{shout.likeCount}} Likes
                  </v-btn>
                
                  <!---------------------- SHOUT COMMENTS MODAL ------------------->
                  <AppCommentsModal :shout="shout"></AppCommentsModal>
                </v-card-actions>
            </v-col>

            <!--------------------------- SHOUT DELETE MODAL -------------------------->
            <div class="center ml-5 pa-0" v-if="isAuthenticated">
              <AppDeleteShout v-show="user.handle === shout.userHandle" :shout="shout"></AppDeleteShout>
            </div>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// COMPONENTS
import AppDeleteShout from '@/components/Shout/AppDeleteShout.vue';
import AppCommentsModal from '@/components/Shout/AppCommentsModal.vue';
import { mdiCommentMultipleOutline, mdiHeartOutline } from '@mdi/js';
import { likeMethod } from '@/mixins/mixins';
export default {
  components: {
    AppDeleteShout,
    AppCommentsModal
  },
  props: {
      shout: {
          type: Object,
          required: true
      }
  },
  mixins: [likeMethod],
  data: () => ({
    svg: {
      comment: mdiCommentMultipleOutline,
      heartOut: mdiHeartOutline
    },
    sizeAvatar: 110,
    isAuthenticated: false
  }),
  methods: {
    getUser() {
          let uri = '//localhost:4000/users';
      this.axios.get(uri).then(response => {
      const isLogin = response.data.filter(login => login.isLogin == true)
      if (isLogin.length > 0){
      this.isAuthenticated = true;
      this.user = isLogin[0];
      }
      });
    }
  },
  created() {
    if(window.innerWidth < 500) {
      this.sizeAvatar = 150
    }
      let uri = '//localhost:4000/users';
      this.axios.get(uri).then(response => {
      const isLogin = response.data.filter(login => login.isLogin == true)
      if (isLogin.length > 0){
      this.isAuthenticated = true;
      this.user = isLogin[0];
      }
    });
  }
}
</script>