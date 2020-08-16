
function config(){
    function baseUrl(){
<<<<<<< HEAD
        return ("http://localhost/saory-web/dinibir/");
=======
        return ("https://adaojose.github.io");
>>>>>>> cdac72819cd0eee892270f03a1be632413e875c4
    }
    function baseServerUrl(){
        return ("https://www.localhost/saory-api");
    }
    function appKey(){
        return "abcd"
    }
    function appId(){
        return(1);
    }
    function loginPage(){
        return baseUrl()+"/login.html"
    }
    function indexPage(){
        return (baseUrl()+"/curtidos.html")
    }
    function isDev(){
        return true;
    }
<<<<<<< HEAD
    function noImage(){
        return("https://2419.cdn.simplo7.net/static/2419/sku/quadros-decorativos-paisagens-quadro-paisagem-cataratas-do-iguacu--p-1535378058475.jpg");
    }
=======
>>>>>>> cdac72819cd0eee892270f03a1be632413e875c4
    return{
        baseUrl,
        baseServerUrl,
        appKey,
        appId,
        indexPage,
        isDev,
<<<<<<< HEAD
        loginPage, 
        noImage
=======
        loginPage
>>>>>>> cdac72819cd0eee892270f03a1be632413e875c4
    };
}
export default config;