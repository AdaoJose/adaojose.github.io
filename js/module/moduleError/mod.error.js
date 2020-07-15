/**
 * Executa instrução conforme o targt e o codigo do erro passados por parametro
 * @param  errCode codigo do erro retornado tipo int
 * @param  target string com o nome ao qual esta funcao se refere Ex. login
 * implementados: login.
 */
function loadErrorCode(errCode, target){
    console.log("[loadErrorCod] start ...");
    target = target+''.toLowerCase();
    
    //Referese ao qual gatilho ira disparar
    let msg  = "";
    switch (target){
        case "login":
           
                
                switch (errCode){
                    case 214:
                        msg = "Entre em seu email para ativar a senha.";
                    break;
                    case 215:
                        msg = "Senha incorreta";
                    break;
                    case 216:
                        msg = "email invalido";
                    break;
                    case 217:
                        msg = "Usuario não registrado. Faça seu cadastro...";
                    break;
                    default:
                        msg = "Há algum erro em sua tentativa de fazer login...";
                    break;
                }
            
    }
    console.log("[loadErrorCod] finish ...");
    return(msg);
}

export default loadErrorCode;