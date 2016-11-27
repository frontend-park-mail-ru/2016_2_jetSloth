// наименование для нашего хранилища кэша
const CACHE_NAME = 'monopoly_serviceworker_v_1';
// ссылки на кэшируемые файлы
const cacheUrls = [
	'/',
	'/build/css/main.css',
	'/build/css/font-awesome.min.css',
	'/build/js/app.js'
];

this.addEventListener('install', function (event) {
	// задержим обработку события
	// если произойдёт ошибка, serviceWorker не установится
	event.waitUntil(
		// находим в глобальном хранилище Cache-объект с нашим именем
		// если такого не существует, то он будет создан
		caches.open(CACHE_NAME)
			.then(function (cache) {
			return cache.addAll(cacheUrls);
		})
	);
});

this.addEventListener('fetch', function (event) {
	// console.log(event);
	event.respondWith(
		// ищем запрашиваемый ресурс в хранилище кэша
		caches.match(event.request).then(function (cachedResponse) {

			// выдаём кэш, если он есть
			if (cachedResponse) {
				return cachedResponse;
			}

			// иначе запрашиваем из сети как обычно
			return fetch(event.request);
		})
	);
});
