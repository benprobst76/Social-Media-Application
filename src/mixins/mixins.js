export const reset = {
    methods: {
        reset() {
            if(this.loginUser) {
                this.loginUser.email = '';
                this.loginUser.password = '';
            }
            if(this.formNewUser) {
                this.formNewUser.email = '';
                this.formNewUser.password = '';
                this.formNewUser.confirmPassword = '';
                this.formNewUser.handle = '';
            }
        }
    }
}

export const likeMethod = {
    methods: {
        likeShout(isAuthenticated, shout) {
            if(isAuthenticated && shout) {
              if(!this.isLiked) {
                shout.likeCount++;
                let uri = `http://localhost:4000/shouts/update/${shout._id}`;
                this.axios.post(uri, shout)
              }
              else {
                shout.likeCount--;
                let uri = `http://localhost:4000/shouts/update/${shout._id}`;
                this.axios.post(uri, shout)
              }
            }
            else {
              this.$router.push({name: 'login'});
            }
        },
    }
}