/**
 * serviceWorker几个重要的参数
 * 1.self 代表了serviceWorker作用域
 * 2.caches 代表了serviceWorker的全局参数
 * 3.skipWaiting 强制的让处于wait的脚本进入activate
 */
//添加缓存版本戳
var cacheName = "yd-pwa-step-v1";
var filesToCache = [
    "/js/index.js",
    "/css/index.css",
    "/images/ff.jpeg",
    "/index.html",
    "/"
];
self.addEventListener("install", function (event) {
    //首次注册的时候被触发
    //能够缓存所有的应用
    console.log("安装成功");
    event.waitUntil(updateStaticCache);
});
function updateStaticCache() {
    return caches.open(cacheName)
        .then(function (cache) {
            //addAll是原子操作 一旦某个文件缓存失败了 整个缓存全部作废
            return cache.addAll(filesToCache);
        })
        //多个sw进行注册的时候 立即激活 不用等待
        .then(() => self.skipWaiting());
}
//cacheName=>当成了当前的版本戳  old key 🆚 new key
//不做缓存在浏览器中的直接的读取操作 干掉老的内容
self.addEventListener("activate", function (event) {
    console.log("激活成功");
    event.waitUntil(caches.keys().then(function(keyList){
        //遍历当前版本戳的缓存
        return Promise.all(keyList.map(function(key){
            if(key !== cacheName){
                return caches.delete(key);
            }
        }))
    }));
});

self.addEventListener("fetch", function (event) {
    //拦截网络请求 抓包工具
    // event.respondWith(new Response("拦截请求"));
    console.log("截取当前网络请求",event.request.url);
    event.respondWith(
        caches.match(event.request).then(function(response){
            return response || fetch(event.request.url);
        })
    )
});


importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.2.0/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}