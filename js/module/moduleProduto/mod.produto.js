
import esquemaHtmlProduto from './mod.esquemaHtmlProduto.js';
import config  from '../../config.js'; 
const $conf = config();

/** 
 * Esta function é a responsavel por pegar os produtos de servidor e trazer para o front-end
 * @param numPag referece ao index que será carregado ex pg 1 carrega os produtos da capa 
 * este parametro poderá ser usado para paginação
 * @returns JSON de produtos
*/
 async function getProdServer(numPag){
    console.log("[getProdServer] inicializando...");//log de inicialização
    return new Promise((resolve, reject)=>{
        let myHeaders = new Headers();
        myHeaders.append("AppKey", $conf.appKey());
        myHeaders.append("AppId", $conf.appId());
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
             user:JSON.parse(localStorage.getItem("usuario")),
             controler:"catalogo", 
             index:numPag
            });

        var requestOptions = {
            method: 'POST',
            Headers: myHeaders,
            body: raw,
            redirect: 'follow'
            };
        let url = $conf.baseServerUrl()+"/api/produto";
        fetch(url, requestOptions).
        then(response=>response.text()).
        then(text=>{
            
            var $resposta = text;
            
            try {
                //passa a resposta para json
                $resposta = JSON.parse( $resposta );
                resolve($resposta);

            } catch (error) {
                reject( ["[getProdServer] Erro ao passar objeto para o formato json...", $resposta] );
            }
            
        })
        .catch(err=>{
            reject("[getProdServer] não resolvido finalizado...", err);
        });

    });
      
}





/**
 * É responsavel por fazer o carregamento dos produtos 
 * e adicionar a janela
 * @param pagination numero da paginação e paginação == 2 retorna os arquivos da pagina 2 do catalogo
 * @paramType janelas
 * @dependence Janelas-js, Jquery, Bootstrap, fontAwesome
 * 
 */

export default function carregarProdutos(pagination){
    console.log("[carregarProdutos] inicializando...");
    return new Promise((resolve, reject)=>{
        getProdServer(pagination).
        then(response=>{
            var produtos = response;
            console.log(produtos);
            var ret = [];//retorno
            for(var [key, value] of Object.entries(produtos)){//correndo o Json retorno 
                if(produtos.length>0){
                    
                    /**construindo o html */
                    let html = esquemaHtmlProduto(value);
                    ret.push(html);
                    

                    //let figureEndereco = "#" + janelaParaAppend.id + " > .painel > #" + value.codigo + "> .cat-img-block"//Endereco do figure para append imagem
                    
                    //loadImg(value.img[0],figureEndereco,"prepend");
                }
            } //fim de for()
            resolve(ret);
        }).
        catch(e=>reject(e));//fim de getProdServer.then()

    });
    
    console.log("[carregarProdutos] finalizado...");
}

