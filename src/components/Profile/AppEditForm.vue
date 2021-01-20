<template>
    <form @submit.prevent="handleSubmit" ref="form">
        <v-card-text>
        <v-container>
            <v-row>
            <v-col cols="12">
                <v-textarea label="A short Bio about You" type="text" required v-model="user.bio" color="cyan" no-resize>
                </v-textarea>
            </v-col>
            <v-col cols="12">
                <v-text-field label="Your personal/professional Website" type="text" required v-model="user.website" color="cyan">
                </v-text-field>
            </v-col>
            <v-col cols="12">
                <v-text-field label="Your Location" type="text" required v-model="user.location" color="cyan">
                </v-text-field>
            </v-col>
            </v-row>
        </v-container>
        </v-card-text>
        <v-card-actions>
        <div class="flex-grow-1"></div>
            <v-btn color="cyan darken-1"  text @click.stop="$emit('click')">Close</v-btn>
            <v-btn color="cyan darken-1"  text type="submit">Save</v-btn>
        </v-card-actions>
    </form>
</template>

<script>
export default {
    data: () => ({
        user: {}
    }),
    methods: {
        handleSubmit() {
          let uri = `http://localhost:4000/users/update/${this.user._id}`;
          this.axios.post(uri, this.user).then(() => {
                this.$emit('click')
        })
        }
    },
    created() {
    let uri = '//localhost:4000/users';
    this.axios.get(uri).then(response => {
    const isLogin = response.data.filter(login => login.isLogin == true)
    this.user = isLogin[0];
   });
  }
}
</script>