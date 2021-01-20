<template>
    <form @submit.prevent="loginHandlerSubmit" ref="form">
        <v-text-field
            v-model="user.handle"
            :rules="handleRules"
            label="Name"
            required
            color="cyan"
        ></v-text-field>
        <v-text-field
            v-model="user.email"
            :rules="emailRules"
            label="E-mail"
            required
            color="cyan"
        ></v-text-field>
        <v-text-field
            v-model="user.password"
            :append-icon="showPassword ? svg.visibility : svg.visibilityOff"
            :type="showPassword ? 'text' : 'password'"
            name="password"
            label="Password"
            hint="At least 6 char acters"
            counter
            @click:append="showPassword = !showPassword"
            color="cyan"
        ></v-text-field>
        <v-text-field
            v-model="confirmPassword"
            :append-icon="showPassword ? svg.visibility : svg.visibilityOff"
            :type="showPassword ? 'text' : 'password'"
            name="confirmPassword"
            label="Confirm Password"
            hint="At least 6 char acters"
            counter
            @click:append="showPassword = !showPassword"
            color="cyan"
        ></v-text-field>

        <div v-if="confirmPassword != user.password" class="subtitle1 text-center text-capitalize red--text">
            <p> passwords dont match!</p>
        </div>

            <span>Already have an account? <router-link class="cyan--text" to="/login">Sign In Here</router-link></span>

        <div class="mt-5">
            <v-btn type="submit" class="mr-4" color="#32BCC3" elevation="0" dark>
                Sign Up
            </v-btn>
            <v-btn @click="reset" color="#32BCC3" elevation="0" dark>
                Clear
            </v-btn>
        </div>
    </form>
</template>

<script>
//ICONS
import { mdiEyeOutline } from '@mdi/js';
import { mdiEyeOffOutline } from '@mdi/js';
import { reset } from '@/mixins/mixins';
import dayjs from 'dayjs';
export default {
    mixins: [reset],
    data: () => ({
        showPassword: false,
        confirmPassword: '',
        user: {
            email: '',
            password: '',
            handle : '',
            isLogin : false,
            imageUrl: '@/assets/profile-picture.png'
        },
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        handleRules: [
            v => !!v || 'Name is required'
        ],
        svg: {
            visibility: mdiEyeOutline,
            visibilityOff: mdiEyeOffOutline,
        },
    }),
    methods: {
        loginHandlerSubmit() {
        this.user.createdAt = dayjs().format('h:mm a, MMMM DD YYYY');
        let uri = 'http://localhost:4000/users/add';
        this.axios.post(uri, this.user).then(() => {
                this.$router.push({ name: 'home'});
        });
        },
    }
}
</script>