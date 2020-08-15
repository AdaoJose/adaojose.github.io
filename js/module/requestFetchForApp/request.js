import config from "../../config.js";
const $conf = config();
/**
 * request() 
 * Esta função visa reaproveitar a estrutura nescessaria para 
 * lançar requisiçãoe no webserver padrão evitando, demasiadas reescritas de codigo.
 * Usando à não será nescesário informar o appId pois esta ja o faz 
 * @param {*} $url 
 * [obrigatorio]
 * Destino de requisição
 * @param {*} $raw 
 * [Obrigatório]
 * Corpo da requisição
 * @returns Promise
 * Para manipular o valor retornado pode-se fazer da mesma forma que se faz 
 * com o fetch (estrutura padrão do javascript). 
 * Ex. 
 * <code>
 *  request($url, $Body).then(response=>{
 *      //code for success...
 *  }).catch(err=>{
 *      //code for faill
 *  })
 * </code>
 */
export default function request($url, $Body){
    var myHeaders = new Headers();
    myHeaders.append("AppKey", $conf.appKey());
    myHeaders.append("AppId", $conf.appId());
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: $Body,
        redirect: 'follow'
    };

    return fetch($url, requestOptions)

}