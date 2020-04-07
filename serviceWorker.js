var CACHE_NAME = "ch_17_10_19_02";
var path = "";
this.addEventListener("install",function(event){
    event.waitUntil(
            caches.open(CACHE_NAME).then(function(cache){
                console.log("[ cache ] registrado");
                        return cache.addAll([
                            path + "js/jquery.js",
                            path + "css/bootstrap-4.3.1-dist/css/bootstrap.min.css",
                            path + "css/bootstrap-4.3.1-dist/js/bootstrap.js",
                            path + "css/fontawesome/fontawesome.css",
                            path + "js/expo_produto.js",
                            path + "js/functions_expo.js",
                            path + "css/expo_prod.css",
                            path + "js/wsApi.js",
                            path + "login.html",
                            path + "img/logobranco.jpg",
                            path + "img/logobranco.ico",
                            path + "css/webfonts/fa-solid-900.woff2",
                            path + "ajuda.html",
                            path + "img/iconeimg.png",
                            path + "img/nointernet.jpg",
                            path + "expo_produto.html",
                            path + "acompanharpedidos.html"//,
                            //"https://kit.fontawesome.com/2912494906.js"
                        ])
                    })
        )
});

this.addEventListener("fetch", function(event){
    var response;
    event.respondWith(caches.match(event.request)
        .then(function(r) {
            response = r;
            if(!response) throw "não tem cache";
            caches.open(CACHE_NAME).then(function(cache){
                cache.put(event.request, response);
            })
            return response.clone();
        })
        .catch(function(){
            return fetch(event.request).then(function(res){
                return res.clone();
            },
            function(err){
                caches.match(path + "expo_produto.html");
            }
            )
        })
    );
});
this.addEventListener("activate", function(event){
    //event.waitUntil(caches.delete("ch_17_10_19"));
})