<template>
    <div>
        <v-row class="pa-3">
            <v-col offset="1" cols="10" class="center relative">
                <v-avatar size="200">
                    <v-img class="card-img" src="@/assets/profile-picture.png"></v-img>
                </v-avatar>
            </v-col>
            <v-col offset="1" cols="10" class="background">
                    <v-row>
                        <v-col>
                            <!------------------ PROFILE DATA ------------------>
                            <div class="text-center mb-3 title text-secundario font-weight-bold">
                                <span>@</span>{{user.handle}}
                            </div>
                            <div v-if="user.bio" class="text-center mb-3 pr-5 pl-5 font-weight-regular">
                                {{user.bio}}
                            </div>
                            <div v-if="user.location" class="text-center mb-3">
                                <v-icon>{{svg.location}}</v-icon>
                                <span>
                                    {{user.location}}
                                </span>
                            </div>
                            <div v-if="user.website" class="text-center mb-3">
                                <v-icon>{{svg.web}}</v-icon>
                                <span>
                                    <a :href="user.website" target="_blank">&nbsp;{{user.website}}</a>
                                </span>
                            </div>
                            <div class="text-center">
                                <v-icon>{{svg.calendar}}</v-icon>
                                <span>
                                    {{user.createdAt | day}}
                                </span>
                            </div>
                            <!------------------ END PROFILE DATA ------------------>
                            <div class="mt-5">
                                <div>
                                    <!--------------- EDIT PROFILE MODAL ----------------->
                                    <AppEditProfile></AppEditProfile>
                                    <!---------------END EDIT PROFILE MODAL ------------->
                                </div>
                            </div>
                        </v-col>
                    </v-row>
            </v-col>
        </v-row>
    </div>
</template>
<script>
import AppEditProfile from '@/components/Profile/AppEditProfile.vue';
import { mdiMapMarker, mdiWeb, mdiCalendar } from '@mdi/js';
export default {
    components: {
        AppEditProfile,
    },
    data: () => ({
        svg: {
            location: mdiMapMarker,
            web: mdiWeb,
            calendar: mdiCalendar
        },
        user: {
            imageUrl: '@/src/assets/profile-picture.png',
            bio: '',
            website: '',
            location: ''
        }
    }),
    created() {
        let uri = '//localhost:4000/users';
        this.axios.get(uri).then(response => {
        const isLogin = response.data.filter(login => login.isLogin == true)
        this.user = isLogin[0];
    });
  }
}
</script>