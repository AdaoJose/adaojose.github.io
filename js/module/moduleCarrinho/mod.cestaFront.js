import config from "../../config.js";
import carrinho from "../moduleCarrinho/mod.carrinho.js";
import alertar from "../alertar/mod.alertar.js";
var $conf = config();

export default function cesta(){
    console.log("[cesta] inicializando...");
    function hide(){
        $(".expo-lista-compra").hide("slow");
        return(this);
    }
    function show(){
        console.log("[cesta().show()] inicializando ...");
        /**
         * carregarTemplateCesta()
         * Function responsavel por verificar se na pagina já foi carregado a estrutura da cesta de compras
         * @returns OBJJquery de localização da cesta em caso de sucesso e uma mensagem com o erro em caso de falha 
         */
        function carregarTemplateCesta(){
            return new Promise((resolve, reject)=>{
                if(!$(".expo-lista-compra").length){//verifico se o template já foi carregado
                    $.get("template/cesta.tpl", function(data){
                        //carregado
                        $("body").
                        append(data);

                        //botão finalizar compra
                        $(".btn-f-compra").
                        click(()=>{
                            //vai para a tela de adicionar endereco
                            window.
                            location.
                            href = 
                                config().
                                baseUrl()+"/endereco.html"
                            ;

                            });
                            //botao fechar cesta
                            $(".expo-ico-carrinho-hide").
                            click(()=>{cesta().hide()});

                        //Se depois de carregado ainda não houver esta classe 
                        ($(".expo-lista-compra").length) ?  resolve($(".expo-lista-compra")) : reject("template/cesta.tpl carregado mais não atende ao padão");
                        
                    });
                }else{
                    resolve($(".expo-lista-compra"));
                }
            });//fim promise
        }

        carregarTemplateCesta().then(($cesta)=>{
                $cesta.
                show("slow");
                sinc();
                console.log("[cesta().show()] finalizando ...");
        
        })
        
        
        
    }
    function reset(){
        $(".expo-body-lista-compra").html("");
    }
    function sinc(){// apenas adiciona produtos vindos do servidor para sincronia com o servidor sem enviar para o servidor
        //console.log(produto.todos[id]);
            let $loading =$("<div/>", {class:"spinner-grow text-primary text-center m-auto ", role:'status', style:"width:65px;hight:65px;"})
                .append($("<span/>",{class:"sr-only"}).append("Carregando..."))
            ;
            $loading = $("<div/>",{class:"text-center mt-5 loading-cesta",style:"width:300%"}).append($loading);
            let btnReload = $('<div/>', {"class":" text-center btn-reload-cesta mt-5", style:"width:200%"})
                        .append($("<button/>", {
                            "class":"btn btn-primary m-auto",
                            click:()=>{
                                sinc();
                            }
                        }).append("Tentar outra vez"))
            ;
            reset();//retira todos produtos da lista
            btnReload .remove();
            $(".expo-body-lista-compra").append($loading);
            carrinho.listaDeCompras().then(e=>{
                //console.log(e)
                var totalCompra = 0.0;
                if((Object.keys(e).length)>0){
                    $.each(e, function(key, val){
                        // cesta.sinc(val.productId,val.quantity,val.quantity, val.value);
                        let id = val.productId;
                        let nome  = val.name;
                        let quantidade = val.quantity;
                        let tamanho = val.size;
                        let valor = val.value;
                        
                        let $row  = $("<tr/>",{"id":"item-"+id});
                        let $img = $("<img/>",
                            {
                                //"src":((produto.todos[id].img[0]!="")?produto.todos[id].img[0]:'8'),
                                "class":"img-fluid expo-img-aux"
                            }
                        );
                        let $tdImg = $("<td/>",
                            {
                                "class":"expo-lista-compra-img-item"
                            }
                        ).
                        append( $img );
                        let $tdNome = $("<td/>").
                        append(nome);
                        let $iPreco = $("<i>",{
                            "class":"item-preco"
                        }).
                        append( valor );
                        let $iQuantidade = $("<i/>",
                        {
                            "class":"item-qtd"
                        }).
                        append(quantidade); 

                        let $tdPrecoXQuantidade = $("<td/>",{"class":"preco-qtd"}).
                        append( 
                            $iPreco , " <br>X " , $iQuantidade
                            );
                        let $tdRemove  = 
                                $("<td/>",
                                {
                                    "class":"btn btn-outline-primary",
                                    "id":id,
                                    click:function(){
                                        //chama a instancia de carrinho.remove
                                        carrinho.
                                        remove( $(this).attr("id") ).
                                        then(e=>{
                                            alertar(e);
                                            console.log(e);
                                            sinc();
                                        }).catch(e=>{
                                            alertar(e);
                                            console.log(e);
                                        })
                                    }
                            }).
                            append("X")
                        totalCompra+=valor*quantidade;
                        //TotalCompra(id,(valor*quantidade));
                        $("#"+id).addClass("destaque");//marca produto adicionado
                        let html = $row.
                        append( 
                            $tdImg ,
                            $tdNome ,
                            $tdPrecoXQuantidade ,
                            $tdRemove
                        );
                    $(".expo-body-lista-compra").append(html);
    
                    })
                    $loading.remove();//remove carregamento depois de adicionar produtos 
                            
                }
                //cesta vazia
                else if((Object.keys(e).length)<1){
                    console.log("Cesta vazia");

                    let cestaVazia = 
                    $("<div/>",{class:"lead mt-5 text-center", style:"width:160%"}).
                    append("Sua cesta de compra ainda esta vazia :(");

                    $(".expo-body-lista-compra").
                    append(cestaVazia);
                    $loading.remove();//remove carregamento depois de adicionar produtos
                }
                return totalCompra;
                
            }).
            then(totalCompra=>{$(".expo-total-compra").text(totalCompra)}).
            catch(e=>{
                console.log(e);
                
                $(".expo-body-lista-compra").append(btnReload);
                $(".loading-cesta").remove();//remove carregamento depois de adicionar produtos
            });
            
            
    }
    console.log("[cesta] finalizado...");
    return {
        hide,
        show,
        reset,
        sinc
    }
}//fim de cesta()