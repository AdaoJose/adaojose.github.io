import esquemaHtmlProduto from './mod.esquemaHtmlProduto.js';

/** 
 * Esta function é a responsavel por pegar os produtos de servidor e trazer para o front-end
 * @returns JSON de produtos
*/
 async function getProdServer(){
    var myHeaders = new Headers();
    myHeaders.append("AppKey", APP_KEY);
    myHeaders.append("AppId", APP_ID);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({ user:JSON.parse(localStorage.getItem("usuario"))});

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    //body: raw,
    redirect: 'follow'
    };
    let urlAlvo = URL_SERVER_BASE+"api/view/purchaseditems";
    try{
        const response = await fetch("https://localhost/saory-api/teste", requestOptions);
        return response.json();
        
    }catch(err){
        console.log(err);
    }
    
}


$(".addCarrinhoConfirmar").click(function(){carrinho.confirmar(this)});


/**
 * É responsavel por fazer o carregamento dos produtos 
 * e adicionar a janela
 * @param janelaParaAppend {Janelas onde sera alocado o resultado}
 * @paramType janelas
 * @dependence Janelas-js, Jquery, Bootstrap, fontAwesome
 * 
 */

export default function carregarProdutos(janelaParaAppend){
    return getProdServer().then(response=>{
        var produtos = response;
        console.log(produtos);
        
        for(var [key, value] of Object.entries(produtos)){//correndo o Json retorno 
            if(produtos.length>0){
                produto.todos[value.codigo] = value;
                /**construindo o html */
                let html = esquemaHtmlProduto(value);

                janelaParaAppend.
                append(html); // adiciona o produto a janela

                let figureEndereco = "#" + janelaParaAppend.id + " > .painel > #" + value.codigo + "> .cat-img-block"//Endereco do figure para append imagem
                
                loadImg(value.img[0],figureEndereco,"prepend");
            }
        } //fim de for()
    });//fim de getProdServer.then()
   
}

