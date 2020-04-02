import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const MEMOS = 'Memos'
const USERS = 'Users'
const FCM_ID = 'FcmId'

// Setup Firebase
export const config = {
	projectId: 'memorizer-80e96',
	apiKey: 'AIzaSyAttcLpK5q92-JnRHSMdpDp0w38F1UM4AM',
	authDomain: 'memorizer-80e96.firebaseapp.com',
	databaseURL: 'https://memorizer-80e96.firebaseio.com',
	messagingSenderId: '240997208188'
}

class FirebaseService {
	constructor(config) {
		firebase.initializeApp(config)
		this.auth = firebase.auth()
		this.firestore = firebase.firestore()
		this.user = null

	}

	getMemos() {
		const memosCollection = this.firestore.collection(MEMOS)
		return memosCollection
				.where('email', '==', this.user.email)
				.orderBy('created_at', 'desc')
				.get()
				.then((docSnapshots) => {
					return docSnapshots.docs.map((doc) => {
						let data = doc.data()
						data.id = doc.id
						data.created_at = new Date(data.created_at.toDate())
						return data
					})
				})
	}

	postMemo(title, memo) {
		return this.firestore.collection(MEMOS).add({
			title,
			memo,
			email: this.user.email,
			created_at: firebase.firestore.FieldValue.serverTimestamp()
		})
	}

	deleteMemo(memoId) {
		return this.firestore.collection(MEMOS).doc(memoId).delete()
	}

	loginWithGoogle() {
		return this.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
				.then(() => {

					let provider = new firebase.auth.GoogleAuthProvider()
					return firebase.auth().signInWithRedirect(provider)
							.then((result) => {
								console.log(result)
							})
				})
				.catch((error) => {})

	}

	onAuthChange = (user) => {
		if(user) {
			this.user = user
		} else {
			console.log('로그아웃')
		}
	}

	/*	setCloudMessaging() {
			this.messaging.usePublicVapidKey("BO_VX8rMoCZBWpXVc78dpKUmLxwuQIaaTlDPI7EbuX1CoMdfRa8Jto2h9Bi2LDltYIFD76-o8STD_n0KY3yhbR0")
			this.messaging.requestPermission()
					.then((test) => {
						console.log('메세징 권한 획득', test)
						return this.messaging.getToken()
					})
					.then((token) => {
						console.log('fcm token : ', token)
					})
					.catch((e) => {
						console.log('메세징 권한 획득 중 에러', e)
					})
		}

		saveFCMToken() {
			//로그인 후에 fcm 정보를 검색하여 저장
			const cbGetToken = (token) => {
				console.log('setLogin fcmId get : ', token)
				let uid = this.auth.currentUser.uid
				this.firestore.collection(FCM_ID).doc(uid).set({token})
			}

			this.messaging.getToken()
					.then(cbGetToken)
					.catch(function(e) {
						console.log('fcmId 확인 중 에러 : ', e)
					})
		}*/
}

export default FirebaseService