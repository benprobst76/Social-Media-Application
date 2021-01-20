<template>
    <form @submit.prevent="handlePostSubmit" ref="form">
        <v-card-text>
            <v-container>
                <v-row>
                    <v-col cols="12">
                    <p class="font-weight-light grey--text text--darken-1 body-2 mt-1" >{{shout.createdAt | exactDay}}</p>
                        <v-textarea label="Write a comment" type="text" required v-model="shout.body" counter  no-resize rows="4" color="#32BCC3">
                        </v-textarea>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>
        <v-card-actions>
        <div class="flex-grow-1"></div>
            <v-btn color="#32BCC3" text 
            @click="$emit('click')">
                Close
            </v-btn>
            <v-btn color="#32BCC3" text type="submit">
                Post your shout
            </v-btn>
        </v-card-actions>
    </form>
</template>
<script>
import dayjs from 'dayjs';
export default {
    data: () => ({
        shout: {
        body: '',
        comments: {}
        },
        user: {}
    }),
    methods: {
        handlePostSubmit() {
        this.shout.userHandle = this.user.handle;
        this.shout.createdAt = dayjs().format('h:mm a, MMMM DD YYYY');
        let uri = '//localhost:4000/shouts/add';
        this.axios.post(uri, this.shout).then(() => {
                this.$emit('click')
        });
        }
    },
    created(){
      let uri = '//localhost:4000/users';
      this.axios.get(uri).then(response => {
      const isLogin = response.data.filter(login => login.isLogin == true)
      this.user = isLogin[0];
    });
    },
        filters: {
        exactDay(date) {
             return dayjs(date).format('h:mm a, MMMM DD YYYY');
        }
    }
}
</script>