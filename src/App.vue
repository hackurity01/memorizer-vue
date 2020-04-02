<template>
  <div id="app">

    <div v-if="firebaseService && firebaseService.user && firebaseService.user.email">
      <Header v-bind:memos="memos"/>
      <ItemList v-bind:memos="memos" :deleteMemo="deleteMemo"/>
      <AddButton :postMemo="postMemo"/>
    </div>
    <div v-else>
      <v-btn flat small v-on:click="loginWithGoogle">
        로그인 해주세요
      </v-btn>
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import ItemList from './components/ItemList.vue'
import AddButton from './components/AddButton.vue'
import FirebaseService, {config} from '@/services/FirebaseService'

import Api from '@/services/Api'

export default {
  name: 'app',
  components: {
		Header,
		ItemList,
		AddButton
  },
	data () {
		return {
      firebaseService: null,
			memos: []
    }
	},
	mounted() {
		this.firebaseService = new FirebaseService(config)

		this.firebaseService.auth.onAuthStateChanged((user) => {
      this.firebaseService.onAuthChange(user)

			if (user) {
				this.getMemos()
			}
		})
	},
	methods: {
		async loginWithGoogle() {
			const result = await this.firebaseService.loginWithGoogle()
		},
		async getMemos() {
			this.memos = await this.firebaseService.getMemos()
		},
		postMemo(title, memo) {
			return this.firebaseService.postMemo(title, memo)
					.then((docRef) => {
						alert('Saved!')
						this.getMemos()
					})
					.catch((error) => {
						console.error('[Error Post] ', error)
					})
		},
		deleteMemo(memoId) {
			if(!confirm('Are you sure?')) {
				return
      }
			return this.firebaseService.deleteMemo(memoId)
          .then(() => {
          	this.getMemos()
          })
    }
	},
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
