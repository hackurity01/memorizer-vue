console.log('service-worker------------------', self)

const A_MINUTE = 1000

self._interval = null

self.addEventListener('install', event => {
	event.waitUntil(self.skipWaiting())
})

self.addEventListener('activate', event => {
	event.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', (event) => {
	const url = event.request.url

	let responseBody = {
		url
	}

	if(url.includes('start-push-interval')) {
		console.log('start-push-interval', event)

		event.request.json()
				.then((data) => {
					console.log(data)
					const memos = data.memos
					const cycle = data.cycle
					let i = 0

					self._interval = setInterval(() => {
						self.registration.showNotification(memos[i].title, {body: memos[i].memo})
						i = (i + 1) % memos.length
					}, cycle * A_MINUTE)
				})
	}
	else if(url.includes('clear-push-interval')) {
		console.log('clear-push-interval', event)
		clearInterval(self._interval)
		self._interval = null
	}
	else if(url.includes('set-data')) {
		console.log('POST DATA ', event.request.json().then((data) => {console.log(data)}))
				/*caches.match(event.request).then(function(resp) {
					return resp || fetch(event.request).then(function(response) {
						return caches.open('v1').then(function(cache) {
							cache.put(event.request, response.clone());
							return response;
						})})
					})*/
	}
	else if(url.includes('push-status')) {
		responseBody.push_status = self._interval ? 'on' : 'off'
	}
	else {
		return
	}

	const responseInit = {
		status: 200,
		statusText: 'OK',
		headers: {
			'Content-Type': 'application/json',
			'X-Mock-Response': 'yes'
		}
	}
	const mockResponse = new Response(JSON.stringify(responseBody), responseInit)

	event.respondWith(mockResponse)
})
