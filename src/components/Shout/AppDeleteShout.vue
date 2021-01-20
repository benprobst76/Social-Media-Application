<template>
  <div>
    <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            elevation="0" small absolute right top fab @click.stop="dialog = true" v-on="on" style="transform: translateY(35px)">
            <v-icon color="red lighten-1">{{svg.delete}}</v-icon>
          </v-btn>
        </template>
      <span>Delete shout</span>
    </v-tooltip>
    
    <v-dialog v-model="dialog" max-width="290" >
      <v-card>
        <v-card-title class="headline"></v-card-title>

        <v-card-text>
            Are you sure you want to delete this shout?
        </v-card-text>

        <!---------------------- ACTIONS BUTTONS -------------------->
        <v-card-actions>
          <div class="flex-grow-1"></div>

          <v-btn color="cyan darken-1" text @click="dialog = false">
            No
          </v-btn>
          <v-btn color="red darken-1" text @click="handleDeleteShout" >
            Delete
          </v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mdiDeleteOutline} from '@mdi/js';
export default {
  props: {
    shout: {
      type: Object
    }
  },
  data () {
    return {
      dialog: false,
      svg: {
        delete: mdiDeleteOutline
      }
    }
  },
  methods: {
      handleDeleteShout() {
      let uri = `//localhost:4000/shouts/delete/${this.shout._id}`;
      this.axios.delete(uri).then(() => {
        this.dialog = false;
    });
      }
  }
}
</script>