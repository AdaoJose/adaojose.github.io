
function config(){
    function baseUrl(){
        return ("http://localhost/saory-web/dinibir/");
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
    function noImage(){
        return("https://2419.cdn.simplo7.net/static/2419/sku/quadros-decorativos-paisagens-quadro-paisagem-cataratas-do-iguacu--p-1535378058475.jpg");
    }
    return{
        baseUrl,
        baseServerUrl,
        appKey,
        appId,
        indexPage,
        loginPage, 
        noImage
    };
}
export default config;