const CACHE_VERSION = 'app-v11'
const CACHE_FILES = []

const lastCache = new Set()

function updateCached () {
  console.log('zzn updateCached~')
  caches.open(CACHE_VERSION).then(function (cache) {
    // cache.keys().then((requests) => {
    //   console.log('zzn updateCached requests:', requests)

    //   requests.forEach(request => {
    //   //   console.log('zzn delete cache~')
    //     caches.delete(request)
    //   //   // if (!lastCacheUrls.has(request.url)) {
    //   //   //   console.log('zzn delete cache lastCacheUrls.size, request.url~', lastCacheUrls.size, request.url, lastCacheUrls.has(request.url))
    //   //   // }
    //   })
    // })
    

    caches.keys().then(function(keys) {
      console.log('zzn keys3:', keys)
      return Promise.all(
        keys.map(function(key, i) {
          console.log('zzn key, keys[i]2:', key, keys[i])
          return caches.delete(key)
        })
      )
    })
  })
}

self.addEventListener('install', function(event) {
  console.log('zzn install')
  event.waitUntil(
    caches.open(CACHE_VERSION).then(function(cache) {
      console.log('opened cache')

      return cache.addAll(CACHE_FILES)
    })
  )
})

self.addEventListener('activate', function(event) {
  console.log('zzn activate~')
  event.waitUntil(
    caches.keys().then(function(keys) {
      console.log('zzn keys3:', keys)
      return Promise.all(
        keys.map(function(key, i) {
          if (key !== CACHE_VERSION) {
            return caches.delete(key)
          }
        })
      )
    })
  )

  setTimeout(function() {
    updateCached()
  }, 3000)
})

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(res) {
      if (res) {
        lastCache.add(res.url)
        return res
      }

      return requestBackend(event)
    })
  )
})

function requestBackend(event) {
  const request = event.request.clone()
  console.log('zzn fetch event.request.urll:', request.url)

  return fetch(request).then(function(res) {
    if (!res || res.status !== 200 || res.type !== 'basic') {
      return res
    }

    if (canCache(request.url)) {
      const response = res.clone()
      caches.open(CACHE_VERSION).then(function(cache) {
        lastCache.add(response.url)
        cache.put(event.request, response)
      })
    }

    return res
  })
}

function canCache(url) {
  return url.endsWith('a.css') || url.endsWith('bg_video.mp4')
}
