<template>
    <form @submit.prevent="loginHandlerSubmit" ref="form">
        <v-text-field
            v-model="loginUser.email"
            :rules="emailRules"
            label="E-mail"
            required
            color="#32BCC3"
        ></v-text-field>
        <v-text-field
            v-model="loginUser.password"
            :type="showPassword ? 'text' : 'password'"
            aria-autocomplete="current-password"
            name="input-10-1"
            label="Password"
            hint="At least 6 characters"
            counter
            color="#32BCC3"
        ></v-text-field>

        <div>
            <span>Don't have an account? <router-link class="cyan--text" to="/signup">Sign Up Here</router-link></span>
        </div>

        <div class="mt-5">
            <v-btn type="submit" class="mr-4" color="#32BCC3" elevation="0" dark>
                Submit
            </v-btn>
        </div>
    </form>
</template>

<script>
export default {
    data: () => ({
        showPassword: false,
        loginUser: {
            email: '',
            password: ''
        },
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],

    }),
    methods: {
        loginHandlerSubmit() {
            this.$store.dispatch('SIGN_IN', {
                email: this.loginUser.email,
                password: this.loginUser.password
            })
            .then(() => {
                this.$router.push({name: 'home'});
            })
        },
        signUp(){
            console.log(1);
            this.$router.push({name: 'SignUp'})
        }
    },
    beforeDestroy() {
        this.$store.dispatch('CLEAR_ERROR')
    }
}
</script>