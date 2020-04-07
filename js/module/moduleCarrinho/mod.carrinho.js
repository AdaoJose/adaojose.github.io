/**
 * @description 
 * O objeto carrinho será o responssavel por gerenciar o carrinho de compras 
 */
var carrinho = {
    /** 
     * @param _HTMLprodTag
     * parametro qua contenha todos os datas necessario nele
     * ex. data-tamanho-valor, data-nome, data-img, data-descricao, data-tot-avaliacao, data-nota, data-tamanho-valor, data-estoque, data-custo-envio 
     * e algum outros que seja necessario
     * @param _HTMLprodTag pode ser $(this) ou this ou até $('.btn_add_to_cart')
    */
    add:_HTMLprodTag=>{
        var paramHtml = $(_HTMLprodTag);
        var botaoConfirmar = $(".addCarrinhoConfirmar");//botão clicado ao finalizar a compra

        botaoConfirmar.
        attr("data-prod-id", paramHtml.attr("data-id"));

        botaoConfirmar.
        attr("data-prod-nome", paramHtml.attr("data-nome"));

        //diz ao objeto ao carrinho qual a categoria deste produto
        $(".addCarrinhoBody").
        attr("data-categoria", paramHtml.attr("data-categoria"));

        let txtPreco  = ()=>{
                    let obj = JSON.parse( paramHtml.attr("data-tamanho-valor"));
                    let vp = parseFloat(obj[0][Object.keys(obj[0])[0]].valor);

                    botaoConfirmar.attr("data-prod-valor", vp);

                    botaoConfirmar.attr("data-prod-tamanho", Object.keys(obj[0])[0]); 

                    botaoConfirmar.attr("data-quantidade", 1);
                    
                    return Object.keys(obj[0])[0]+" "+vp.toLocaleString('pt-BR',{style:"currency", currency:"BRL"});
                }
        $(".addCarrinhoPreco").text(txtPreco);
        $("#addCarrinhoTitulo").html(paramHtml.attr("data-nome"));
        let carregando  = $("<div/>",{"class":"text-center"})
                            .append($("<div/>",{
                                    "class":"spinner-border text-primary",
                                    "role":"status"
                                })
                                .append($("<span/>",{
                                        "class":"sr-only"
                                    })
                                    .append("Loading..."))
                            );
        let htmlExpoProd
        =$("<div/>",{"class":"row"})
         .append(
             $("<div>",{"class":"col-12 text-center"})
                 .append(
                    $("<img/>",{
                     "src":()=>{
                         return(paramHtml.attr("data-img").split(",")[0]);
                     },
                     "class":"img-fluid addCarrinhoImg"
                    })
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
                         console.log($(this).children("option:selected").attr("data-cor"));
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
                        text($(this).text());
                     }
                 })
                 .append(()=>{
                     let option = "";
                     let obj = JSON.parse( paramHtml.attr("data-tamanho-valor"));
                    for (var property in Object.values(obj)){
                        Object.entries(obj[property]).forEach(([key, value]) => { 
                            let vp = parseFloat(value.valor);
                            let cor_quantidade = JSON.stringify(value.cor_quantidade);
                            option+="<option data-cor="+cor_quantidade+" value="+key+"> "+key+" "+vp.toLocaleString('pt-BR',{ style: 'currency', currency: 'BRL' })+"</option>";
                        })
                       
                      }
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
                     "arial-label":"Escolha acor do produto"
                 })
                 .append(()=>{
                    let option = "";
                    let obj = JSON.parse( paramHtml.attr("data-tamanho-valor"));
                    //como o primeiro item a ser pego é o da posição zero pego a cor da mesma posição
                    Object.entries(obj[0]).forEach(([key, value]) => {
                        let x  = 0 ;
                        Object.entries(value.cor_quantidade).forEach(([cor, quantia])=>{
                            
                            if(x==0) botaoConfirmar.attr("data-prod-cor", cor);
                            
                            option+="<option data-max="+quantia+" value="+cor+"> "+cor+ "</option>";
                            x++;
                        })
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
            $(".addCarrinhoSelectTamanho").change(function(){
                //alert("Mudou");
                });
        },2000);
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
        switch(categoria){
            
            case "vestimenta": //trata produto como vestimentas
                $('#addCarrinho').modal('hide');
                
                let produto = {
                    codigo: $(self).attr("data-prod-id"), 
                    nome: $(self).attr("data-prod-nome"),
                    valor: $(self).attr("data-prod-valor"),
                    tamanho: $(self).attr("data-prod-tamanho"), 
                    cor: $(self).attr("data-prod-cor"),
                    quantidade: $(self).attr("data-quantidade")
                }
                var dataOBJForSend = {"products":{"id":produto.codigo,"quantity":produto.quantidade,"size":produto.tamanho},user:JSON.parse(localStorage.getItem("usuario"))};
                $.post({"url":"https://localhost/saory-api/api/cart/add",
                        "headers":headersApp,
                        "data":JSON.stringify(dataOBJForSend)
                }).
                done(
                    (d)=>{
                        console.log(d);
                        if(d.status=='error'){//if return erro on server
                            alertar("Erro ao adicionar a lista de compras. Estamos trabalhando para resolver!");
                        }else{
                            alertar(produto.nome+" adicionado a lista de compras!");
                            $(".cat-carrinho[data-id="+produto.codigo+"]").removeClass("text-primary").addClass("text-success");
                        }
                    }
                ).
                fail(
                    (d,statusText, xhr)=>{
                        console.log(d);
                        alertar(produto.nome+" não adicionado! Erro de conexão!");
                    }
                );

            break;
        }
    }
}

export default carrinho;
