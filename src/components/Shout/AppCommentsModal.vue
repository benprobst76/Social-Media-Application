<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent scrollable max-width="600px">

      <!------------------------ COMMENTS BUTTON ----------------------->
      <template v-slot:activator="{ on }" > 
        <v-btn color="#2c003e" text small @click="getShout" v-on="on">
            <v-icon left>{{svg.comment}}</v-icon>
            {{shout.commentCount}} Comments
        </v-btn>
      </template>
      <!------------------------ COMMENTS ----------------------->
      <v-card>
        <v-card-title class="primario white--text">{{shout.userHandle}}</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="min-height: 300px; max-height: 500px;">
          <!---------------------- MAIN COMMENT PROFILE --------------------->
          <AppCommentProfile class="mt-5" :shout="shout" :comments="false"></AppCommentProfile>
          <v-divider></v-divider>
          <!--------------------- AUTH COMMENT FORM -------------------->
          <div class="mt-5 mb-5 center">
            <AppNewCommentForm v-if="isAuthenticated" :shoutId="shout._id"></AppNewCommentForm>
            <router-link v-else to="/login">
              <v-btn elevation="0" color="#32BCC3" dark>Comment</v-btn>
            </router-link>
          </div>

          <v-divider></v-divider>
          <div class="mt-5" v-for="(comment, i) in shout.comments" :key="i">
            <AppCommentProfile class="mt-5" :shout="comment" @click="closeModal"></AppCommentProfile>
          </div>

        </v-card-text>
        <v-divider></v-divider>

        <!---------------------- ACTIONS BUTTONS -------------------->
        <v-card-actions class="background-secundario">
          <v-btn text @click="likeShout(isAuthenticated, shout)" small color="grey">
              <v-icon color="red" left>{{svg.heartOut}}</v-icon>
              {{shout.likeCount}} Likes
          </v-btn>
          <v-btn text small color="grey">
            <v-icon>{{svg.comment}}</v-icon>
            &nbsp;{{shout.commentCount}}
          </v-btn>
          <div class="flex-grow-1"></div>
            <v-btn color="cyan darken-1" text @click="closeModal">Close</v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import AppCommentProfile from '../Shout/AppComentProfile.vue';
import AppNewCommentForm from '../Shout/AppNewCommentForm.vue';
import { mdiCommentMultipleOutline, mdiHeartOutline, mdiHeart } from '@mdi/js';
import { likeMethod } from '@/mixins/mixins';
import { setTimeout } from 'timers';
export default {
  components: {
    AppCommentProfile,
    AppNewCommentForm
  },
  props: {
      shout: {
          type: Object
      }
  },
  mixins: [likeMethod],
  data () {
    return {
      dialog: false,
      svg: {
        comment: mdiCommentMultipleOutline,
        heart: mdiHeart,
        heartOut: mdiHeartOutline
      },
      isAuthenticated: false,
    }
  },
  methods: {
    getShout() {
      this.dialog = true
      setTimeout(() => {
      
      }, 300)
    },
    closeModal() {
      this.dialog = false
      setTimeout(() => {
      
      }, 100)
    }
  },
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