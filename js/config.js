
function config(){
    function baseUrl(){
        return ("https://adaojose.github.io");
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
    return{
        baseUrl,
        baseServerUrl,
        appKey,
        appId,
        indexPage,
        loginPage
    };
}
export default config;