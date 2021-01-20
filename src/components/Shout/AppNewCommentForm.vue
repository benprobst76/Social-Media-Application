<template>
    <v-row class="background">
        <v-col cols="4" offset-sm="0" sm="3">
            <div class="text-center">
            <v-avatar size="50">
                <img src="@/assets/profile-picture.png" alt="avatar">
            </v-avatar>
            </div>
        </v-col>
        <v-col cols="8" sm="8" class="pa-2">
            <v-row>
                <v-col cols="12" class="pa-2">
                    <h3 class="title">{{user.handle}}</h3>
                </v-col>
                <v-col class="text-left pa-2" cols="12">
                    <form @submit.prevent="handleCommentSubmit" ref="form">
                            <v-row>
                                <v-col cols="12">
                                    <v-textarea label="Write a comment" type="text" required v-model="comment.body" counter  no-resize 
                                    color="#32BCC3" rows="3">
                                    </v-textarea>
                                </v-col>
                            </v-row>
                        <v-card-actions>
                        <div class="flex-grow-1"></div>
                            <v-btn color="cyan darken-2"  text @click="body = ''" small>Clear</v-btn>
                            <v-btn color="cyan darken-2"  text type="submit" small>Comment</v-btn>
                        </v-card-actions>
                    </form>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<script>
import dayjs from 'dayjs';
export default {
    props: ['shoutId'],
    data: () => ({

        comment: {
            body: '',
            userHandle: '',
            createdAt: {
                type: Date
            }
        },
        user: {},
        shout: {}
    }),
    methods: {
        handleCommentSubmit() {
            this.comment.createdAt = dayjs().format('h:mm a, MMMM DD YYYY');
            this.comment.userHandle = this.user.handle;
            this.shout.comments.push(this.comment);
            this.shout.commentCount++;
            let uri = `http://localhost:4000/shouts/comment/${this.shout._id}`;
            this.axios.post(uri, this.shout).then(() =>{
                this.comment.body = '';
            })
        },
    },
      created() {
      let uri = '//localhost:4000/users';
      this.axios.get(uri).then(response => {
      const isLogin = response.data.filter(login => login.isLogin == true)
      if (isLogin.length > 0){
      this.user = isLogin[0];
      }
    });
      let ur = '//localhost:4000/shouts';
      this.axios.get(ur).then(response => {
      const isShout = response.data.filter(shout => shout._id == this.shoutId)
      this.shout = isShout[0];
      });
      }
}
</script>