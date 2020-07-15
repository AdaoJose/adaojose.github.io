import config from "../../config.js";
import loadErrorCode from "../moduleError/mod.error.js";
var $conf = config();
function login(email=null, senha=null){
    console.log("[login] start...");
    
    function LoginValidate(){
        let storeLogin = localStorage.getItem("login");
        let validade = storeLogin.accessTokenValidity;
        
    }
    /**
     * registrarLogin é chamado após a autenticação do usuario
     * basicamente registra os dados do usuario no localstorage.
     * Este metodo não faz validação alguma apenas espera que os dados 
     * passados ja estejam validados
     * @param returnServer tratase do retorno do servidor
     */
    function registrarLogin(returnServer){
        // registra dados do login no localstorage
        
        localStorage.
        setItem("login",JSON.stringify(returnServer));
    }
    let urlServer = 
        $conf.
        baseServerUrl()+
        "/api/usuario/login"
    ;

    let raw = 
        JSON.
        stringify({ 
            'email':email, 
            'password':senha 
        });

    var myHeaders = 
        new Headers()
    ;

    myHeaders.
    append("AppKey", $conf.appKey());

    myHeaders.
    append("AppId", $conf.appId());

    myHeaders.
    append("Content-Type", "application/json");

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    console.log("[login] init fetch...");
    
    return fetch(urlServer, requestOptions).
    then(response => response.json()).
    then(e=>{
        //json
        // usuario não autenticado erro de credenciais
        console.log(e);
        
        if(e.status=="error"){
            alertar(loadErrorCode(e.code, "login"));
            console.log("[login] Error user or pass... end fetch");
            return(false);
        }
        //usuario autenticado
        else{
            let loginRetorno = {
                nome: e.data.name,
                email:e.data.userEmail,
                accessToken:e.data.accessToken,
                accessTokenValidity:e.data.accessTokenValidity
            };
            
            registrarLogin(loginRetorno);
            console.log("[login] Success user... end fetch");
            
            return true;
        }
    }).catch((e)=>{
        // erro de rede
        //verifica se tem internete
        if(!navigator.onLine){
            alertar("conecte a uma rede de dados ou wifi");
        }
        // erro de rede desconhecido
        else{
            alertar("Parece que tivemos problema com a conexão de internet");
        }
        console.error("[login] error...");
        console.log(e);
        return false;
    });

}







/**
 * Promise responsavel por realisar o cadastro de novos usuario.
 * esta function interage diretamente com o webservice de cadastro de usuarios.
 * @param nome nome do usuario;
 * @param email email do usuario;
 * @param senha senha do usuario;
 * Atenção. esta função não faz verificação de duplo campo de senha para verificar igualdade
 */




function cadastrar(nome, email, senha){
    
    let urlServer = 
        $conf.
        baseServerUrl()+
        "/api/usuario/cadastrousuario"
    ;

    let raw = 
        JSON.
        stringify({ 
            'name':nome,
            'email':email, 
            'password':senha 
        });

    var myHeaders = 
        new Headers()
    ;

    myHeaders.
    append("AppKey", $conf.appKey());

    myHeaders.
    append("AppId", $conf.appId());

    myHeaders.
    append("Content-Type", "application/json");

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    console.log("[Cadastro de usuario] init fetch...");
    
    return fetch(urlServer, requestOptions).
    then(response => response.json()).
    then(e=>{
        //json
        // usuario não autenticado erro de credenciais
        console.log(e);
        
        if(e.status=='error'){
            switch(e.code){
                case 210:
                    alertar("Email invalido");
                break;
                case 211:
                    alertar("Entrada de senha invalida");
                break;
                case 212:
                    alertar("Nome contem caracteres invalidos");
                break;
                case 213:
                    alertar("Usuario já registrado. Tente fazer login ou recupere a senha");
                break;
                default:
                    alertar("Houve um erro ao realizar cadastro");
                break;
            }
            
        }else{
            login(email,senha);
        }
    }).catch((e)=>{
        // erro de rede
        //verifica se tem internete
        if(!navigator.onLine){
            alertar("conecte a uma rede de dados ou wifi");
        }
        // erro de rede desconhecido
        else{
            alertar("Parece que tivemos problema com a conexão de internet");
        }
        console.error("[login] error...");
        console.log(e);
        return false;
    });
}
function usuario(){
    return {login, cadastrar}
}

// exporto as funções de usuario como modulos
export  default usuario;