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
            :append-icon="showPassword ? svg.visibility : svg.visibilityOff"
            :type="showPassword ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            hint="At least 6 char acters"
            counter
            @click:append="showPassword = !showPassword"
            color="#32BCC3"
        ></v-text-field>

            <span>Don't have an account? <router-link class="cyan--text" to="/signup">Sign Up Here</router-link></span>

        <div class="mt-5">
            <v-btn type="submit" class="mr-4" color="#32BCC3" elevation="0" dark>
                Submit
            </v-btn>
            <v-btn @click="reset" color="#32BCC3" elevation="0" dark>
                Clear
            </v-btn>
        </div>
    </form>
</template>

<script>
import { reset } from '@/mixins/mixins';
import { mdiEyeOutline, mdiEyeOffOutline  } from '@mdi/js';
export default {
    mixins: [reset],
    data: () => ({
        showPassword: false,
        loginUser: {
            email: '',
            password: '',
            isLogin: false
        },
        users: [],
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        svg: {
            visibility: mdiEyeOutline,
            visibilityOff: mdiEyeOffOutline,
        },
    }),
    methods: {
        loginHandlerSubmit() {
        let uri = '//localhost:4000/users';
        this.axios.get(uri).then(response => {
        this.users = response.data;
        const validUser = this.users.filter(user => user.email === this.loginUser.email && user.password === this.loginUser.password);
            if (validUser.length > 0 ){
                validUser[0].isLogin = true;
                let ur = `http://localhost:4000/users/update/${validUser[0]._id}`;
                this.axios.post(ur, validUser[0]).then(() => {
                    this.$router.push({name: 'home'});
                });
            }
        });
        },
    }
}
</script>