<template>
  <div class="AddButton">

    <v-dialog
            v-model="dialog"
            fullscreen
    >
      <template v-slot:activator="{ on }">
        <div class="floating">
          <v-btn v-on="on" color="#fafafa"
                 class="elevation-2" fab small expand
          >
            <v-icon dark>add</v-icon>
          </v-btn>
        </div>
      </template>
      <v-card>
        <v-card-title class="lighten-2 title-field">
          <v-text-field
                  v-model="newMemo.title"
                  label="New Memo"
                  hide-details
                  clearable
          ></v-text-field>
        </v-card-title>

        <v-card-text class="lighten-2 memo-field">
          <v-textarea
                  v-model="newMemo.memo"
                  placeholder="Description"
          ></v-textarea>
        </v-card-text>


        <v-card-actions class="actions-field justify-space-around" >
          <v-btn
                  flat
                  color="#999"
                  @click="dialog = !dialog"
          >
            Cancel
          </v-btn>
          <v-btn
                  flat
                  @click="addMemo"
          >
            Add
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>


<script>
import AddDialog from './AddDialog.vue'
// import FirebaseService from '@/services/FirebaseService'

export default {
	name: 'Header',
	props: ['postMemo'],
	components: {
		AddDialog
	},
	data() {
		return {
			dialog: false,
			newMemo: {
				title: '',
				memo: ''
			}
		}
	},
	methods: {
		addMemo() {
			this.postMemo(this.newMemo.title, this.newMemo.memo)
          .then(() => {
						this.newMemo = {
							title: '',
							memo: ''
						}
						this.dialog = false
          })
		}
	},
}
</script>

<style scoped>
  .floating {
    position: fixed;
    z-index: 100;
    right: 10px;
    bottom: 10px;
  }

  .title-field {
    padding-bottom: 0;
  }

  .memo-field {
    padding-bottom: 0;
  }

  .actions-field {
    text-align: center;
  }
</style>