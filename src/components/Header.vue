<template>
  <v-toolbar flat color="#fff">
    <v-toolbar-title>memorizer</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-switch
              style="margin-top:16px;"
              v-model="isPushOn"
              @change="onChangeSwitch"
      ></v-switch>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import Api from '@/services/Api'

export default {
	name: 'Header',
	props: ['memos'],
	data() {
		return {
			isPushOn: false,
      dialog: false
		}
	},
	mounted() {
		this.checkPushStatus()
	},
	methods: {
		onChangeSwitch(value) {
			if(value) {
				this.showDialog()
				this.pushOn(1)
      } else {
				this.pushOff()
      }
		},
		pushOn(cycle) {
			Api('/').post(`/start-push-interval`, {memos: this.memos, cycle})
		},
		pushOff() {
			Api('/').get(`/clear-push-interval`)
		},
		checkPushStatus() {
			Api('/').get(`/push-status`).then((response) => {
        const status = response.data.push_status
				this.isPushOn = status === 'on'
			})
		},
		showDialog() {
			this.dialog = true
		}
	},
}
</script>

<style>
  .accent--text {
    color: #444!important;
    caret-color: #444!important;
  }
</style>
