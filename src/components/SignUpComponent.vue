<template>
    <form @submit.prevent="loginHandlerSubmit" ref="form">
        <v-text-field
            v-model="formNewUser.handle"
            :rules="handleRules"
            label="Name"
            required
            color="cyan"
        ></v-text-field>
        <v-text-field
            v-model="formNewUser.email"
            :rules="emailRules"
            label="E-mail"
            required
            color="cyan"
        ></v-text-field>
        <v-text-field
            v-model="formNewUser.password"
            :type="showPassword ? 'text' : 'password'"
            name="password"
            label="Password"
            hint="At least 6 char acters"
            counter
            @click:append="showPassword = !showPassword"
            color="cyan"
        ></v-text-field>
        <v-text-field
            v-model="formNewUser.confirmPassword"
            :type="showPassword ? 'text' : 'password'"
            name="confirmPassword"
            label="Confirm Password"
            hint="At least 6 char acters"
            counter
            @click:append="showPassword = !showPassword"
            color="cyan"
        ></v-text-field>

        <div>
            <span>Already have an account? <router-link class="cyan--text" to="/login">Sign In Here</router-link></span>
        </div>
    </form>
</template>

<script>
export default {
    // mixins: [reset],
    data: () => ({
        showPassword: false,
        formNewUser: {
            email: '',
            password: '',
            confirmPassword: '',
            handle : '',
        },
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        handleRules: [
            v => !!v || 'Name is required'
        ],

    }),
    methods: {
        loginHandlerSubmit() {
            this.$store.dispatch('SIGN_UP', this.formNewUser)
            .then(() => {
                this.$router.push({ name: 'home'});
            })
        },
    },

    beforeDestroy() {
        this.$store.dispatch('CLEAR_ERROR')
    }
}
</script>