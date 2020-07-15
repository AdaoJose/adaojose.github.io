import config from "../../config.js";
import alertar from '../alertar/mod.alertar.js';
/**
 * @description 
 * O objeto carrinho será o responssavel por gerenciar o carrinho de compras 
 */
var carrinho = {
    /**
     * Metodo responsavel por remover produto da lista de compras
     * @param id id do produto
     */
    remove:function(id){
        return new Promise((resolve, reject)=>{
            console.log("[carrinho.remove] inicializando...");
            let $conf  = config();

            let myHeaders = new Headers();
            myHeaders.append("AppKey", $conf.appKey());
            myHeaders.append("AppId", $conf.appId());
            myHeaders.append("Content-Type", "application/json");

            let raw = JSON.stringify({"products":{"id":id},"user":JSON.parse(localStorage.getItem("login"))});

            let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
            };
            let uri = $conf.baseServerUrl()+"/api/cart/remove";
            
            fetch(uri, requestOptions)
            .then(response => response.json())
            .then(result =>{
                // console.log(result);

                $("#"+id).
                removeClass("destaque");//remove destaque do produto removido
                console.log("[carrinho.remove] finalizado...");
                resolve("Este item foi removido");
            })
            .catch(error => {
                console.log("[carrinho.remove] finalizado...");
                if(!navigator.onLine){
                    reject("Falha! Você não tem uma conexão.");
                }else{
                    reject("Falha! verifique a sua conexão.");
                }
            });

        });//fim de promise
        
        
    },
    /** 
     * @param _HTMLprodTag
     * parametro qua contenha todos os datas necessario nele
     * ex. data-tamanho-valor, data-nome, data-img, data-descricao, data-tot-avaliacao, data-nota, data-tamanho-valor, data-estoque, data-custo-envio 
     * e algum outros que seja necessario
     * @param _HTMLprodTag pode ser $(this) ou this ou até $('.btn_add_to_cart')
    */
    add:_HTMLprodTag=>{
        // console.log($(_HTMLprodTag).attr('data-id'));
        // caso aindo não tenha estrutura adiciono a padrão
        if(!$("#addCarrinho").length){
            $.get("./template/carrinhoAdd.tpl", function(data){
                $("body").append(data);
            });
        }

        var paramHtml = $(_HTMLprodTag);
        var botaoConfirmar = $(".addCarrinhoConfirmar");//botão clicado ao finalizar a compra
        
        /** informações do produto é adicionado no botão */
        botaoConfirmar.
        attr("data-prod-id", paramHtml.attr("data-id"));

        botaoConfirmar.
        attr("data-prod-nome", paramHtml.attr("data-nome"));

        //diz ao objeto ao carrinho qual a categoria deste produto
        $(".addCarrinhoBody").
        attr("data-categoria", paramHtml.attr("data-categoria"));

        let txtPreco  = ()=>{
                    let obj = JSON.parse( paramHtml.attr("data-tamanho-valor"));
                    let vp = parseFloat(
                                obj[
                                    Object.keys(obj)[0]//pega o primeiro objto
                                ].valor
                            );

                    botaoConfirmar.attr("data-prod-valor", vp);

                    botaoConfirmar.attr("data-prod-tamanho", Object.keys(obj)[0]); 

                    botaoConfirmar.attr("data-quantidade", 1);
                    
                    return Object.keys(obj)[0]+" "+vp.toLocaleString('pt-BR',{style:"currency", currency:"BRL"});
                }
        $(".addCarrinhoPreco").text(txtPreco);
        $("#addCarrinhoTitulo").html(paramHtml.attr("data-nome"));
        let carregando  = $("<div/>",{
            "class":"text-center"
        })
        .append($("<div/>",{
                "class":"spinner-border text-primary",
                "role":"status"
            })
            .append($("<span/>",{
                    "class":"sr-only"
                })
                .append("Loading..."))
        );


        let $divProduto = $("<div/>",{"class":"row"});
        let $divImg = $("<div>",{"class":"col-12 text-center"});
        let $img = $("<img/>",{
            "src":()=>{
                return(paramHtml.attr("data-img").split(',')[0]);
            },
            "class":"img-fluid addCarrinhoImg"
           });
        

        let htmlExpoProd
        =
         $divProduto.append(
             $divImg
                 .append(
                    $img
                 )
            ,$("<div/>",{"class":"col-12 addCarrinhoNome border lead text-primary"})
             .append(
                      //paramHtml.attr("data-nome"),
                      //$("<small>",{"class":"text-small float-right"}).append(paramHtml.attr("data-estoque") + " disponiveis"),
                      $("<div/>",{"class":"col-12  addCarrinhoDescricao mb-3"}).append(paramHtml.attr("data-descricao")),
                      $("<div>",{"class":"col-12 addCarrinhoAvaliacao text-primary"}).append(()=>{
                          let avaliacao = "";
                          if(paramHtml.attr("data-tot-avaliacao")==0){
                              return $("<span/>",{"class":"text-dark"}).append("Item não availado");
                          }
                          let nota = parseFloat(paramHtml.attr("data-nota"));
                          for(var i=1;i<=Math.floor(nota); i++){
                              avaliacao+="<i class='fas fa-star'></i>";
                          }
                          if((nota-Math.floor(nota))>0.2 && nota<5){
                            avaliacao+='<i class="fas fa-star-half-alt"></i>';
                          }
                          return avaliacao;
                      }, 
                      $("<span>",{"class":"text-primary"}).append(" ("+paramHtml.attr("data-tot-avaliacao")+")"))
                    )
            ,$("<tr>")
             ,$("<div/>",{"class":"input-group mb-3 m-auto p-2"})
             .append(
                 $("<div/>",{"class":"input-group-prepend"})
                  .append(
                      $("<span>",{"class":"input-group-text bg-primary text-light"})
                      .append("Tamanho   ")
                 ),

                 $("<select/>",{
                     "class":"form-control addCarrinhoSelectTamanho",
                     "arial-label":"Escolha o tamanho do produto",
                     change:function(){
                         //console.log($(this).children("option:selected").attr("data-cor"));
                        let option = "";// usado para guardar as options dos selects

                        let cor  = 
                        JSON.
                        parse( 
                            $(this).
                            children("option:selected").
                            attr("data-cor")
                        );

                        Object.entries(cor).forEach(([cor, quantia])=>{
                            option+="<option data-max="+quantia+" value="+cor+"> "+cor+ "</option>";
                        });

                        $(".addCarrinhoSelectCor").
                        html("").
                        html(option);
    
                        $(".addCarrinhoPreco").
                        text($(this).
                            children("option:selected").
                            text());
                     }
                 })
                 .append(()=>{
                     let option = "";
                     let obj = JSON.parse( paramHtml.attr("data-tamanho-valor"));
                     console.log(obj);
                     for (var [key, value] of Object.entries(obj)) {

                        let vp = 
                        parseFloat(value.valor);

                        let cor_quantidade = 
                        JSON.
                        stringify(value.cor_quantidade);

                        option+=
                            "<option data-cor="+
                            cor_quantidade+
                            " value="+key+"> "+key+" "+vp.toLocaleString('pt-BR',{ style: 'currency', currency: 'BRL' })+"</option>";
                         console.log(key);
                         console.log(value);
                         
                     }
                    // for (var property in Object.values(obj)){
                    //     Object.entries(obj[property]).forEach(([key, value]) => { 
                    //         let vp = parseFloat(value.valor);
                    //         let cor_quantidade = JSON.stringify(value.cor_quantidade);
                    //         option+="<option data-cor="+cor_quantidade+" value="+key+"> "+key+" "+vp.toLocaleString('pt-BR',{ style: 'currency', currency: 'BRL' })+"</option>";
                    //     })
                       
                    //   }
                      return(option);
                 })
             )
            ,$("<div/>",{"class":"input-group mb-3 m-auto p-2"})
             .append(
                 $("<div/>",{"class":"input-group-prepend"})
                  .append(
                      $("<span>",{"class":"input-group-text bg-primary text-light"})
                      .append("Cor")
                 ),
                 $("<select/>",{ 
                     "class":"form-control addCarrinhoSelectCor",
                     "arial-label":"Escolha a cor do produto"
                 })
                 .append(()=>{
                    let option = "";
                    let obj = JSON.parse( paramHtml.attr("data-tamanho-valor"));

                    //como o primeiro item a ser pego é o da posição zero pego a cor da mesma posição
                    console.log(obj);
                    
                    let objPrimeiraPosicao = obj[Object.keys(obj)[0]];
                    
                    let x  = 0 ;
                    Object.entries(objPrimeiraPosicao.cor_quantidade).forEach(([cor, quantia])=>{
                        
                        if(x==0) botaoConfirmar.attr("data-prod-cor", cor);
                        
                        option+="<option data-max="+quantia+" value="+cor+"> "+cor+ "</option>";
                        x++;
                    })
                    
                      
                     return(option);
                 })
             )
             ,$("<div/>",{"class":"input-group mb-3 m-auto p-2"})
             .append(
                 $("<div/>",{"class":"input-group-prepend"})
                  .append(
                      $("<span>",{"class":"input-group-text bg-primary text-light"})
                      .append("Quantidade")
                 ),
                 $("<input/>",{
                     "class":"form-control",
                     "arial-label":"Escolha quantos produtos deseja comprar.",
                     "type":"number",
                     "value":1,
                     "min":1,
                     "max":paramHtml.attr("data-estoque"),
                     focusout:function(){

                         let maxProd = 
                         parseInt(
                             $('.addCarrinhoSelectCor :selected').
                             attr("data-max")
                         );

                         let valDigitado = 
                         parseInt(this.value);

                         if(valDigitado > maxProd){//verifico se há a quantidade de produto disponível suficiente
                            alertar("Desculpe há apenas "+maxProd+" produtos disponíveis.");

                            $(this).
                            focus();
                         }else{

                            botaoConfirmar
                            .attr("data-quantidade", valDigitado);
                         }
                     }
                 })
             )
            ,$("<tr/>",{"class":"mt-5"})
            ,$("<div/>",{"class":"col-12 border lead"})
             .append("Valor de envio: R$"+paramHtml.attr("data-custo-envio"))
            
  
  
         );
           
        $('#addCarrinho').modal('show');
        $(".addCarrinhoBody").html("");
        $(".addCarrinhoBody").html(carregando);
        setTimeout(()=>{
            $(".addCarrinhoBody").html("").html(htmlExpoProd);
        },2000);
        botaoConfirmar.
        off("click").
        click(
            function(){
                console.log("[.addCarrinhoConfirmar] clicado, ", "chamando carrinho.confirmar(this)");
                carrinho.confirmar(botaoConfirmar);
            }
        );
    },
    /**
     * @author Adão José
     * @param - todos os parametros pegos são do modal id=addCarrinho podendo variar conforme a escolha do usuario
     * posteriormente monta o objeto e submete ao servidor
     * @returns booleans -  em caso de sucesso retorna true em em caso de erro retorna false
     * 
     */
    confirmar:(self)=>{
        let categoriaProdutoSelecionado;
        let categoria  = $(".addCarrinhoBody").attr("data-categoria").toLowerCase();//categoria == categoria do produto
        
        //para cada categoria o tratamento será diferenciado,
        //pois podem haver campos diferenciado dependendo da categroria 
        let $conf = config();
        var myHeaders = new Headers();
            myHeaders.append("AppKey", $conf.appKey());
            myHeaders.append("AppId", $conf.appId());
            myHeaders.append("Content-Type", "application/json");
        let produto = {
            id: $(self).attr("data-prod-id"), 
            nome: $(self).attr("data-prod-nome"),
            valor: $(self).attr("data-prod-valor"),
            tamanho: $(self).attr("data-prod-tamanho"), 
            cor: $(self).attr("data-prod-cor"),
            quantidade: $(self).attr("data-quantidade")
        }  
        console.log(produto.cor);
        var raw = JSON.stringify({ 
            user:JSON.parse(localStorage.getItem("login")),
            "products":{"id":produto.id,"quantity":produto.quantidade,"size":produto.tamanho, "color":produto.cor }
        });

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        
        let urlServer  = $conf.baseServerUrl()+"/api/cart/add";

        fetch(urlServer , requestOptions).
        then(response=>{
            return new Promise((resolve, reject)=>{
                var res = response.text();
                res.then(rs=>{
                    try {//se vir do servidor algo que não seja json é tratado com o bloco do tryCatch
                        resolve( JSON.parse(rs) )
                    } catch (error) {
                        console.error("Erro ao passar para json", rs, error);
                        reject("Houve um erro no servidor ");
                    }//fim de catch

                } ) ;
                localStorage.setItem("teste", res);
                
            })
        }).
        then((d)=>{
            //console.log(d);
            if(d.status=='error'){//if return erro on server
                alertar("Erro ao adicionar a lista de compras. Estamos trabalhando para resolver!");
                console.log(d);
            }else{
                alertar(produto.nome+" adicionado a lista de compras!");
                $(".cat-carrinho[data-id="+produto.id+"]").removeClass("text-primary").addClass("text-success");
            }
        }).catch((d)=>{
            if(d == "TypeError: Failed to fetch"){
                alertar (produto.nome+" não adicionado! Erro de conexão");
                return d 
            }
            console.error(d);

            alertar(produto.nome+" não adicionado! " + d);
        })
        
        $('#addCarrinho').modal('hide');
                
                

            
    },
    /**
     * Retorna todos itens deste usuario adicionados a lista de compras
     * @returns JSON OBJECT
     */
    listaDeCompras(){
        return new Promise((resolve,reject)=>{
            let $conf = config();
            var myHeaders = new Headers();
                myHeaders.append("AppKey", $conf.appKey());
                myHeaders.append("AppId", $conf.appId());
                myHeaders.append("Content-Type", "application/json");
                
            var raw = JSON.stringify({ user:JSON.parse(localStorage.getItem("login"))});

            let requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
            
            let urlServer  = $conf.baseServerUrl()+"/api/cart/showList";

            return fetch(urlServer , requestOptions).
                    then(response => response.json()).
                    then(e=>{
                        //console.log(e);
                        //Servidor retornou erro
                        if(e.status=="error"){
                            console.error("[carrinho.listaDeCompras] Error..." , e);
                            reject("Erro ao retornar lista de compra. Estamos trabalhando para solucionar");
                        }
                        //cesta conseguiu pegar produtos
                        else{
                            console.log("[carrinho.listaDeCompras] produtoscarregados", e);
                            resolve(e);
                        }
                            
                    }).
                    catch(e=>{
                        console.error("[cesta] Erro ao lançar requisição");
                        console.error(e);
                        let msg  = "";
                        if(!navigator.onLine){
                            msg  = "Conecte a uma rede e tente novamente";
                        }else{
                            msg = "Verifique sua conexão com a internet!";
                        }
                        reject (msg);
                    })
        })
    }
}





    

export default carrinho;

