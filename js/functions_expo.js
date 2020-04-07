// Funcao para retornar o menor valor de um array
Array.min = function(array) {
    return Math.min.apply(Math, array);
};

// Funcao para retornar o maior valor de um array
Array.max = function(array) {
    return Math.max.apply(Math, array);
};
function isObject(val) {
    if (val === null) { return false;}
    return ( (typeof val === 'function') || (typeof val === 'object') );
}

function loadImg(img, alvo="body", preOrApend='prepend', atributo = false){

        if(img==""){
            if(isObject(atributo) && atributo!=false){
                atributo.src = 'img/iconeimg.png';
            }else{
                atributo = {
                    "src":'img/iconeimg.png', "class":"cat-img img-fluid bg-light z-index-5",
                    "click":function(){
                        //slide.show($(this).parents(".cat-produto").attr("id"));
                        alertar("Não há imagem disponivel para este produto");
                    },
                }
            }
            $(alvo).append(
                $("<img/>",atributo)
            );
        }else{
            fetch(img)
            .then(function(response) {
                return response.blob();
            })
            .then(function(myBlob) {
                var objectURL = URL.createObjectURL(myBlob);
                //myImage.src = objectURL;
                
                //$(alvo).attr("src",objectURL);
                //console.log($(alvo));
                if(isObject(atributo) && atributo!=false){
                    atributo.src = objectURL;
                }else{
                    atributo = {
                        "src":objectURL, "class":"cat-img img-fluid bg-light z-index-5",
                        "click":function(){
                            slide.show($(this).parents(".cat-produto").attr("id"));
                        },
                    }
                }
                $(alvo).append($("<img/>",atributo));
                
            })
            .catch(()=>{
                //alert("erro");
                alertar("falha de rede ao carregar imagem");
                $(alvo).append(
                    $("<button/>",{
                        "class":"btn btn-outline-primary btn-load-img",
                        click:()=>{
                            loadImg(img, alvo, preOrApend,atributo);
                            $(alvo+" .btn-load-img").remove();
                        }
                    }).append('<i class="fas fa-redo-alt"></i>')
                );

            });
        }
            
}
function adicionarEndereco(){
    //let html = '<div class="row bg-light carregando col-12"><div class="spinner-grow text-primary text-center m-auto centralizar" role="status" style="height: 150px; width: 150px;"><span class="sr-only">Loading...</span></div></div>';
    tela.titulo = "Opção de entrega";
    tela.voltar = true;
    tela.limparPainel();
    //tela.bg = "#474e5d";
    tela.construir();
    //tela.append(html);
                        tela.append('<input class="form-control mt-2 col-12 border-bottom" placeholder="Nome para recebimento" type="text" name="nome" id="e-nome">');
                        tela.append($('<input/>',
                        {
                            class:"form-control mt-2 col-12 border-bottom",
                            "placeholder":"CEP", 
                            'type':"text", 
                            'name':"cep", 'id':"e-cep",
                            blur:function(){
                                let cepOK= false;
                                let cep = $(this).val().replace(/\D/g, '');
                                if(cep != ""){
                                    let validacep = /^[0-9]{8}$/;
                                    if(validacep.test(cep)){
                                        let self = this;
                                        $(this).siblings("#e-uf").val("...");$(this).siblings("#e-cidade").val("...");$(this).siblings("#e-bairro").val("...");$(this).siblings("#e-rua").val("...");
                                        $.getJSON("https://viacep.com.br/ws/"+cep+"/json/",function(dados){
                                            if (!("erro" in dados)) {
                                                console.log(dados.uf);
                                                cepOK = true;
                                                $(self).siblings("#e-uf").val(dados.uf)
                                                $(self).siblings("#e-cidade").val(dados.localidade);
                                                $(self).siblings("#e-bairro").val(dados.bairro);
                                                $(self).siblings("#e-rua").val(dados.logradouro);
                                            }else{
                                                alertar("Cep não encontrado");
                                                cepOK = false;
                                                $(self).siblings("#e-uf").val("");
                                                $(self).siblings("#e-cidade").val("");
                                                $(self).siblings("#e-bairro").val("");
                                                $(self).siblings("#e-rua").val("");
                                                $(self).siblings("#e-cep").focus().css({"color":"red"});
                                            }
                                        }).fail(function(e) {
                                            alertar("Validação de CEP depende de internet");
                                            $("#e-uf").val("");$("#e-cidade").val("");$("#e-bairro").val("");$("#e-rua").val("");
                                            $("#e-cep").focus();
                                            cepOK = false;
                                            console.log( e );
                                        });
                                    }else {
                                        //cep é inválido.
                                        alertar("Formato de CEP inválido.");
                                        cepOK = false;
                                        $("#e-cep").focus();
                                    }
                                }else{
                                    alertar("CEP é obrigatorio!");
                                }
                                
                            }
                        }));
                        tela.append('<input class="form-control mt-2 col-12 border-bottom" placeholder="Estado" type="text" name="uf" id="e-uf" disabled>');
                        tela.append('<input class="form-control mt-2 col-12 border-bottom" placeholder="Cidade" type="text" name="cidade" id="e-cidade" disabled>');
                        tela.append('<input class="form-control mt-2 col-12 border-bottom" placeholder="Bairro" type="text" name="bairro" id="e-bairro" disabled>');
                        tela.append('<input class="form-control mt-2 col-12 border-bottom" placeholder="Rua" type="text" name="rua" id="e-rua" disabled>');
                        tela.append('<input class="form-control mt-2 col-12 border-bottom" placeholder="Numero" type="text" name="numero" id="e-numero">');
                        tela.append('<input class="form-control mt-2 col-12 border-bottom" placeholder="Dados opcionais" type="text" name="opcional" id="e-opcional">');
                        //tela.append('<div class="btn-group btn-group-toggle col-12 text-center" data-toggle="buttons">');
                        //tela.append('<label class="btn btn-primary">Trabalho<input type="radio" name="tc" id="e-trabalho" value="trabalho" autocomplete="off"></label> <label class="btn btn-primary">casa<input type="radio" name="tc" id="e-casa" value="casa"></label>');
                        //tela.append("</div>")
                        tela.append($("<buttom/>", 
                                {
                                    'class':"btn btn-primary col-md-12 mt-4 text-larger",
                                    click:function(){
                                        let self = this;
                                        let endereco = {
                                            "receiver":$(self).siblings("#e-nome").val(),
                                            "street":$(self).siblings("#e-rua").val(),
                                            "district":$(self).siblings("#e-bairro").val(),
                                            "number":$(self).siblings("#e-numero").val(),
                                            "city":$(self).siblings("#e-cidade").val(),
                                            "state":$(self).siblings("#e-uf").val(),
                                            "cep":$(self).siblings("#e-cep").val(),
                                            "optional":$(self).siblings("#e-opcional").val()
                                        }; 
                                        localStorage.setItem("endereco", JSON.stringify(endereco));
                                        if(endereco.receiver!="" && endereco.number!="" && endereco.cep!=""){
                                            $(".tela-finalizar-pagamento").show().css({"top":"100%"}).animate({"top":"0%"},500);
                                            tela.hide();
                                        }else{
                                            alertar("Nenhum campo deve ficar em branco");
                                        }
                                            
                                    }
                                }).append("Continuar")
                        );
}
//esclolher enderco 
function escolherEndereco(data){
    //let html = '<div class="row bg-light carregando col-12"><div class="spinner-grow text-primary text-center m-auto centralizar" role="status" style="height: 150px; width: 150px;"><span class="sr-only">Loading...</span></div></div>';
    tela.titulo = "Opção de entrega";
    tela.voltar = true;
    tela.limparPainel();
    //tela.bg = "#474e5d";
    tela.construir();
    //  tela.append(html);
    
                        $.each(data, function(index, value){
                            tela.append($("<button/>", 
                            {
                                class:"col-12 border btn btn-primary mt-2", 
                                'data-cidade':value.city,
                                'data-estado':value.state,
                                'data-bairro':value.district,
                                'data-rua':value.street,
                                'data-numero':value.number,
                                'data-recebedor':value.receiver,
                                'data-cep': value.cep,
                                'data-complemento': value.optional,
                                click : function(){
                                    let self = this;
                                    let endereco = {
                                        "receiver":$(self).attr("data-recebedor"),
                                        "street":$(self).attr("data-rua"),
                                        "district":$(self).attr("data-bairro"),
                                        "number":$(self).attr("data-numero"),
                                        "city":$(self).attr("data-cidade"),
                                        "state":$(self).attr("data-estado"),
                                        "cep":$(self).attr("data-cep"),
                                        "optional":$(self).attr("data-complemento")
                                    };
                                    localStorage.setItem("endereco",JSON.stringify(endereco));
                                    $(".tela-finalizar-pagamento").show().css({"top":"100%"}).animate({"top":"0%"},500);
                                    tela.hide();
                                }
                            }).append(value.city+" - "+value.state+" <br>Bairro: "+value.district+" Rua: "+value.street, " - Casa: "+value.number+"<br> Responsavel: "+value.receiver));
                        });
                        tela.append($("<div/>", {'class':'col-12 text-center'})
                            .append(
                                $("<button/>",
                                    {
                                        "class":'btn btn-primary mt-4 text-x-lerger',
                                        click:function(){
                                            adicionarEndereco();
                                        }
                                    }
                                ).append("Adicionar um novo endereco")));
}
/**
 * <b>inicio():</b>
 * responssavel por levar o usuario para o inicio da pagina
 */
function logOut(){
    localStorage.setItem("usuario","");
    abrirUrl("login.html");
}
function abrirUrl(url = ''){
    if(url!=""){
        window.location = url;
    }else{
        console.error("'abrirUrl'=>é preciso passar uma url como parametro")
    }
}
function inicio(){
    $(".expo-box-tamanho").hide();
    $(".navbar").show();
    $(".expo-block").hide("slow");
    $(".catalogo").fadeIn("slow");
   
}
function vaParaTela(classOuId,naoEsconda=""){
    $("body > *").not(classOuId+" "+naoEsconda+", #rodape").hide();
    $(classOuId).show("slow");
}
function alertar(e = ""){
    let timer = e.split(' ').length;//tempo para o fim da animação
    timer=(timer*605);
    timer=(timer<2000)?2000:timer;
    $("body").
        append(
                $("<div/>",{"class":"position-fixed alert alert-primary col-12 z-index-max alertar text-center","style":"top:0px"}).
                            append(e)
        );
    setTimeout(function(){
        $(".alertar").animate({"opacity":0},500,"linear",function(){
            $(this).remove();
        });
    },timer)
}

/*
*<b>TotalCompra:</b>
*Responssavel por calcular e apresentar o valor total da compra
*/
var totAPagar =[];//guarda o total a pagar
function TotalCompra(id, valor){
    let soma = 0;
    totAPagar[id] = valor;
    for(val in totAPagar){
        soma = (soma + totAPagar[val]);
    }
    var formato = { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' };

    $(".expo-total-compra").text(soma.toLocaleString('pt-BR', formato));//total a pagar
};

/**
 * ********************************
 *        CARRINHO DE COMPRAS     *
 * ********************************
 */

var cesta = {
    add:function(id,quantidade,tamanho){
        var dataOBJForSend = {"products":{"id":id,"quantity":quantidade,"size":tamanho},user:JSON.parse(localStorage.getItem("usuario"))};
        $.post({"url":"https://localhost/saory-api/api/cart/add",
                "headers":headersApp,
                "data":JSON.stringify(dataOBJForSend)
        }).done(
            (d)=>{
                console.log(d);
                if(d.status=='error'){//if return erro on server
                    alertar("Erro ao adicionar a lista de compras. Estamos trabalhando para resolver!");
                }else{
                    alertar("Adicionado a lista de compras!");
                }
                
            }).fail(
                (d,statusText, xhr)=>{
                    console.log(d);
                    alertar("falha ao adicionar a lista de compras verifique sua conexão!");
                });
        return(this);
    },
    remove:function(id){
        TotalCompra(id,0);
        let myHeaders = new Headers();
        myHeaders.append("AppKey", APP_KEY);
        myHeaders.append("AppId", APP_ID);
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({"products":{"id":id},"user":JSON.parse(localStorage.getItem("usuario"))});

        let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("https://localhost/saory-api/api/cart/remove", requestOptions)
        .then(response => response.json())
        .then(result =>{
            alertar("Este item foi removido");
                    $("#"+id).removeClass("destaque");//remove destaque do produto removido
                    cesta_de_compra.splice(id,1);
                    $("#item-"+id).remove();
        })
        .catch(error => {
            if(!navigator.onLine){
                alertar("Falha! Você não tem uma conexão.");
            }else{
                alertar("Falha! verifique a sua conexão.");
            }
        });
        
    },
    hide:function(){
        $(".expo-lista-compra").hide("slow");
        return(this);
    },
    show:function(){
        cesta.sinc();
        $(".expo-lista-compra").show("slow");
        return(this);
    },
    reset:function(){
        $(".expo-body-lista-compra").html("");
        cesta_de_compra = [];
    },
    sinc:function(){// apenas adiciona produtos vindos do servidor para sincronia com o servidor sem enviar para o servidor
        //console.log(produto.todos[id]);
            let loading =$("<div/>", {class:"spinner-grow text-primary text-center m-auto ", role:'status', style:"width:65px;hight:65px;"})
                .append($("<span/>",{class:"sr-only"}).append("Carregando..."))
            ;
            loading = $("<div/>",{class:"text-center mt-5 loading-cesta",style:"width:300%"}).append(loading);
            let btnReload = $('<div/>', {"class":" text-center btn-reload-cesta mt-5", style:"width:200%"})
                        .append($("<button/>", {
                            "class":"btn btn-primary m-auto",
                            click:()=>{
                                cesta.sinc();
                            }
                        }).append("Tentar outra vez"))
            ;
            cesta.reset();//retira todos produtos da lista
            $(".btn-reload-cesta").remove();
            $(".expo-body-lista-compra").append(loading);
            let dataOBJForSend = JSON.stringify({user:JSON.parse(localStorage.getItem("usuario"))});
            $.post({
                url:URL_SERVER_BASE+"api/cart/showList",
                "headers":headersApp,
                data:dataOBJForSend
            }).done((data)=>{
                console.log(data);  
                if(data.status=="error"){
                    alertar("Erro ao exibir lista de compra. Estamos trabalhando para solucionar");
                    return(this);
                }
                //let json = JSON.parse(data);
                if(data.length<1){//cesta vazia 
                    console.log("Cesta vazia");
                    let cestaVazia = $("<div/>",{class:"lead mt-5 text-center", style:"width:160%"})
                        .append("Sua cesta de compra ainda esta vazia :(")
                    ;
                    $(".expo-body-lista-compra").append(cestaVazia);
                }
                $.each(data, function(key, val){
                   // cesta.sinc(val.productId,val.quantity,val.quantity, val.value);
                    let id = val.productId;
                    let quantidade = val.quantity;
                    let tamanho = val.size;
                    let valor = val.value;
                    TotalCompra(id,(valor*quantidade));
                    $("#"+id).addClass("destaque");//marca produto adicionado
                    let html = $("<tr/>",{"id":"item-"+id}).append(
                        $("<td/>",{"class":"expo-lista-compra-img-item"}).
                            append($("<img/>",{"src":((produto.todos[id].img[0]!="")?produto.todos[id].img[0]:'8'),"class":"img-fluid expo-img-aux"})),
                        $("<td/>").
                            append(produto.todos[id].nome),
                        $("<td/>",{"class":"preco-qtd"}).
                            append($("<i>",{"class":"item-preco"}).append(valor)," <br>X ").append($("<i/>",{"class":"item-qtd"}).append(quantidade)),
                        $("<td/>").
                            append($("<button/>",{"class":"btn btn-outline-primary",
                            "id":id,
                            click:function(){
                                cesta.remove($(this).attr("id"));
                            }
                        }).
                            append("X"))
                    );
                $(".expo-body-lista-compra").append(html);
               
                
                cesta_de_compra[id] = {"id":id,"quantidade":quantidade,"tamanho":tamanho};

                })
                $(".loading-cesta").remove();//remove carregamento depois de adicionar produtos

            }).fail((data)=>{
                console.error(data);
                if(!navigator.onLine){
                    alertar("Conecte a uma rede e tente novamente");
                }else{
                    alertar("Verifique sua conexão com a internet!");
                }
                $(".expo-body-lista-compra").append(btnReload);
                $(".loading-cesta").remove();//remove carregamento depois de adicionar produtos
            });
            
        
        return(this);
    },
    lastSinc:false,
    pre_add:(id)=>{
        //let id = $(this).parents(".cat-produto").attr("id");
        $(".expo-block").attr("data-id",id);
        $(".expo-box-tamanho").fadeIn("slow");
        $(".expo-box-tamanho .expo-tamanho-item").html(" ");
        $(".preco").text(Array.min(Object.values(produto.todos[id].size_value)));
        //console.log(value.size_value);
        for (var [key, val] of Object.entries(produto.todos[id].size_value)) {
            let opt_attr = {"data-valor":val};
            if(val==Array.min(Object.values(produto.todos[id].size_value))){opt_attr.selected=true}
            $(".expo-box-tamanho .expo-tamanho-item").append($("<option/>",opt_attr).append(key));
        }
        $(".expo-box-tamanho .expo-tamanho-item").change(function(){
            $(".expo-box-tamanho .expo-tamanho-item option").each(function(i,v){
            if($(this).val()==$(".expo-box-tamanho .expo-tamanho-item").val()){
                console.log(i);
                $(".preco").text($(this).attr('data-valor'));
            }
        })});
        
        +((produto.todos[id].tamanho)?produto.todos[id].tamanho.splice(","):'8')
    }
};
var pagamento = {
    efetuar : ()=>{
        cartaoDeCredito.nome = $("#pg-nome").val().trim();
            cartaoDeCredito.bandeira = $("#pg-bandeira").val();
            cartaoDeCredito.numero = $("#pg-numero").val();
            cartaoDeCredito.vencimento = $("#pg-vencimento-mes").val()+"/"+$("#pg-vencimento-ano").val();
            cartaoDeCredito.verificador = $("#pg-verificador").val();
            pagamento.tipo = "credito";
            pagamento.dados = cartaoDeCredito;
            //validação
            if(
                cartaoDeCredito.nome !="" && cartaoDeCredito.nome!=null && cartaoDeCredito.nome != undefined &&
                cartaoDeCredito.bandeira !="" && cartaoDeCredito.bandeira!=null && cartaoDeCredito.bandeira != undefined &&
                cartaoDeCredito.numero !="" && cartaoDeCredito.numero!=null && cartaoDeCredito.numero != undefined &&
                cartaoDeCredito.vencimento !="" && cartaoDeCredito.vencimento!=null && cartaoDeCredito.vencimento != undefined &&
                cartaoDeCredito.verificador !="" && cartaoDeCredito.verificador!=null && cartaoDeCredito.verificador != undefined
            ){
                app.chave = "pagamento";
                app.tipo = "credito";
                app.produtos = cesta_de_compra.filter(function(e){return e!=undefined});
                app.bau = cartaoDeCredito;
                //ws.send(JSON.stringify(app));
                
                //carregando.show();
                tela.limparPainel();
                let html = '<div class="row bg-light carregando col-12"><div class="spinner-grow text-primary text-center m-auto centralizar" role="status" style="height: 150px; width: 150px;"><span class="sr-only">Loading...</span></div></div>';
                tela.name = "procecando-pagamento";
                tela.titulo = "Finalizando compra";
                tela.construir();
                tela.voltar = false;
                tela.append(html);
                tela.show();
                let cartao = {
                        holder:$("#pg-nome").val().trim().replace(/\s{1,}/g, ''),
                        brand:$("#pg-bandeira").val().trim().replace(/\s{1,}/g, ''),
                        cvv:$("#pg-verificador").val().trim().replace(/\s{1,}/g, ''),
                        number:$("#pg-numero").val().trim().replace(/\s{1,}/g, ''),
                        expiration:($("#pg-vencimento-mes").val()+"/"+$("#pg-vencimento-ano").val()).trim().replace(/\s{1,}/g, '')
                    };
                let endereco = JSON.parse(localStorage.getItem("endereco"));  
                let dataOBJForSend = {
                    "card":cartao,
                    "products":cesta_de_compra.filter(function(ele){
                        return ele !== undefined;
                      }),
                    "user":JSON.parse(localStorage.getItem("usuario")),
                    "address":endereco
                };
                console.log(dataOBJForSend);
                $.post(
                    {"url":"https://localhost/saory-api/api/pagamento/elo/CREDITO/1234",
                    "Content-Type":"application/json",
                    "headers":headersApp,
                    "data":JSON.stringify(dataOBJForSend)
                }).done(function(data){
                    console.log(data);
                    pagamento.finalizar(data);
                }).fail(function(data){
                    if(tela.name=="procecando-pagamento"){
                        tela.hide();
                    }
                    if(data.status==200){
                        alertar("Desculpe! Ouve um imprevisto ao finalizar o pagamento. Tente novamente por favor...");
                    }else{
                        alertar("Falha ao enviar seu pedido de pagamento... Favor verifique sua conexão e tente novamente");
                    }
                    console.log("Falha ao enviar pagamento");
                    console.log("url = https://localhost/saory-api/api/pagamento/"+cartaoDeCredito.bandeira+"/CREDITO/1234");
                    console.log(data);
                });
            }else{
                alertar("Todos os campos são requiridos");
                //console.log(cartaoDeCredito);
            }
            //console.log(pagamento);
    },
    finalizar : (data)=>{
        switch(data.code){
            case 304 : 
                alertar("Parabens... Sua compra foi finalizada!");
                $(".tela-finalizar-pagamento").hide()
                tela.titulo = "Compra Finalizada!";
                tela.voltar = false;
                tela.limparPainel();
                //tela.bg = "#474e5d";
                tela.construir();
                tela.append($("<h3/>",{class:'text-success text-x-large'}).append('<div class="h-100 w-100 text-center"><i class="fas fa-check"></i> Pagamento aprovado!</div>'));
                tela.append(
                    '<div class="container-fluid"><div><div><p><small>data: '+data.date+'</small></p><p class="text-muted"><span class="text-primary text-larger">Status do pedido</span>:<span class="text-light bg-success p-1"> Esperando sair da loja</span><p class="text-larger text-dark p-2" style="background-color:white">Aguarde te avisaremos sobre atualizações em seu pedido!</p> <br><br>TID: <input type="text" class="form-control" value="'+data.transactionIdentifier+'"></p></div></div> <div class="col-12 text-center"> <buttom class="btn btn-success" onclick="window.location.assign('+"'"+PROJECT_URL_BASE+"acompanharpedidos.html'"+')">Ver Pedido(s)</buttom></div> <div class="col-12 text-center mt-2"> <buttom class="btn btn-link" onclick="window.location.reload()">Ir para o inicio</buttom> </div> </div>'
                );
                tela.show();
                cesta.hide();
                cesta.reset();
                let soma = 0;
                $(".expo-total-compra").text(0);
                
            break;
            case 0 : 
                alertar("Desculpe seu pagamento não foi altorizado");
                if(tela.name=="procecando-pagamento"){
                    tela.hide();
                }
            break;
            case -1:
                alertar("Transação não realizada: Cartão Expirado");
                if(tela.name=="procecando-pagamento"){
                    tela.hide();
                }
            break;
            case -2:
                alertar("Transação não realizada: Cartão Bloqueado");
                if(tela.name=="procecando-pagamento"){
                    tela.hide();
                }
            break;
            case -3:
                alertar("Transação não realizada: Operação demorou muito"); 
                if(tela.name=="procecando-pagamento"){
                    tela.hide();
                }
            break;
            case -4:
                alertar("Transação não realizada: Cartão Cancelado"); 
                if(tela.name=="procecando-pagamento"){
                    tela.hide();
                }
            break;
            case -5:
                alertar("Transação não realizada: Problemas com o Cartão de Crédito"); 
                if(tela.name=="procecando-pagamento"){
                    tela.hide();
                }
            break; 

        }
        tela.hide;
    }
};

var app = {
    numeroCatalogo:0,
    userId:null,
    userName:null,
    userEmail:null,
    userPass:null,
    appId:null,
    chave:null,
    "bau": null//leva objetos opcionais como no caso de pagamento que precisa levar o objeto cartão de credito
};
if(localStorage.getItem("perfil")!=undefined &&localStorage.getItem("perfil")!=null && localStorage.getItem("perfil")!=""){
    app = JSON.parse(localStorage.getItem("perfil"));
}

var usuario = {
    dados: {
        'nome':'',
        'email':'',
        'accessToken':'',
        'accessTokenValidity':''
    },
    login:function(email=null, senha=null){
        $.post( {'url':"https://localhost/saory-api/api/usuario/login", data:{ 'email':email, 'password':senha },headers:headersApp})
                    .done(function( data ) {
                        console.log(data);
                        if(data.status=='error'){
                            switch(data.code){
                                case 214:
                                    alertar("Verifique o email que te mandamos.");
                                break;
                                case 215:
                                    alertar("Senha incorreta");
                                break;
                                case 216:
                                    alertar("email invalido");
                                break;
                                case 217:
                                    alertar("Usuario não registrado. Faça seu cadastro...");
                                break;
                                default:
                                    alertar("Houve um erro inesperado!");
                                break;
                            }
                            
                        }else{
                            //alert("logou");
                            usuario.dados.nome = data.data.name;
                            usuario.dados.email = data.data.userEmail;
                            usuario.dados.accessToken = data.data.accessToken;
                            usuario.dados.accessTokenValidity = data.data.accessTokenValidity;
                            usuario.salvar(usuario.dados);
                            abrirUrl("expo_produto.html");
                        }
                    }).fail(function(){
                        if(!navigator.onLine){
                            alertar("conecte a uma rede de dados ou wifi")
                        }else{
                            alertar("Parece que tivemos problema com a conexão de internet");
                        }
                        
                    });
    },
    cadastro:function(){
        //ws.send(JSON.stringify(app));
        let nome  = $(".form-cadastro #nome").val();
        let email = $(".form-cadastro #email").val();
        let senha = $(".form-cadastro #senha").val();
        $.post({url:"https://localhost/saory-api/api/usuario/cadastrousuario", data:{ name: nome, 'email':email, 'password':senha }, headers:{appId:APP_ID, Appkey:APP_KEY}})
            .done(function( data ) {
                console.log(data);
                if(data.status=='error'){
                    switch(data.code){
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
                    usuario.dados.nome = data.data.name;
                    usuario.dados.email = data.data.email;
                    usuario.dados.accessToken = data.data.accessToken;
                    console.log();
                    usuario.salvar(usuario.dados);
                    abrirUrl("expo_produto.html");
                }
            });
    },
    "salvar":function(usuario){
        localStorage.setItem("usuario",JSON.stringify(usuario));
    },
    sair:function(){
        localStorage.setItem("perfil","");
    }
};
var menu = {
    show:function(){
        pesquisa.hide();
        notificacao.hide();
        $(".tela-menu").animate({right:'0%'},500).show();
    },
    hide:function(){
        $(".tela-menu").animate({right:'100%'},250).show();
    }
};
/**
     * **************************************
     *           PAINEL DE IMAGEM SLIDE     *
     * **************************************
     *  */
    
   
    var slide = {
        "show":function(id){
            $(".expo-slide-img-aside, .expo-slide-img-close").fadeIn();
            let imgs_slide =[]; 
            console.log("produto.todos");
            console.log(produto.todos[id]);
            imgs_slide = (produto.todos[id].img)?(produto.todos[id].img).splice(","):'8';
            console.log(produto.todos[id].img);
            $(".expo-slide-img-aside").html("");
            $(".expo-img-pricipal").attr('src', imgs_slide[0]);
            console.log(imgs_slide[0]);
            for(let i =0 ;i < imgs_slide.length;i++){
                $(".expo-slide-img-aside").append(
                    $("<img/>",{
                        "src":imgs_slide[i],
                        "class":"img-fluid expo-img-aux",
                        click:function(){
                            $(".expo-img-pricipal").
                                attr("src",$(this).
                                attr("src")
                            );
                        }
                    })
                )
            }
            $(".expo-slide-img").show("slow");
        },
        hide:function(){
            $(".expo-slide-img").hide("slow");
        }
    };

    var cesta_de_compra = [];
/**
 * ***********************************
 *       CATALOGO DE PRODUTOS        *
 * ***********************************
 */

var numCat = 0; //numero do catalogo requisitado Ex o primeiro é 1
var produto = {
    todos:[],
    "exibir":function(id){
        rolagem.ultima = window.scrollY;//registra onde o scroll parou
        window.scrollTo(0,0);
        //console.log(rolagem.ultima);
       $(".expo-img").attr("src",produto.todos[id].img.splice(",")[0]);
       $(".expo-nome").text(produto.todos[id].nome);
       $(".expo-descricao").text(produto.todos[id].descricao);
       $(".preco-atual").text(produto.todos[id].preco_atual);
       $(".preco-ant").text(produto.todos[id].preco_anterior);
       $(".expo-block").attr("data-id",produto.todos[id].id).show("slow");
       $(".catalogo").fadeOut("slow");
       $(".expo-btn-add-to-cart").attr("data-id",id);
    },
    "add":function(produtos = []){
        //console.log(produtos);
        for(var [key, value] of Object.entries(produtos)){//correndo o Json retorno 
            if(produtos.length>0){
                produto.todos[value.id] = value;
                /**construindo o html */
                let random = Math.floor(Math.random() * 65536);
                let html = $("<div/>",{"class":"cat-produto col-12  mr-auto ml-auto col-md-2 mb-4 pt-3 z-index-2",
                                        "id":value.id,
                                      }).
                                append(
                                    $("<figure/>",{
                                        "class":"cat-img-block text-center",
                                        id:"img_block"+value.id+"_"+random,
                                    })
                                        .append(
                                                //pego apenas a primeira string do value.id
                                                $("<legend/>",{"class":"cat-legend text-light col-12 bg-primary"}).
                                                        append("R$ "+Array.min(Object.values(value.size_value))),
                                                    $("<div/>",{"class":"cat-social"}).append(
                                                    $("<i/>",{
                                                        "class":"fa fa-heart cat-curtir text-x-large z-index-6 text-primary m-auto",
                                                        "data-id":value.id,
                                                        "data-favoritado":value.favoritado,
                                                        click:function(){
                                                           // $(this).toggleClass("text-primary text-danger");
                                                            var myHeaders = new Headers();
                                                            myHeaders.append("AppKey", APP_KEY);
                                                            myHeaders.append("AppId", APP_ID);
                                                            myHeaders.append("Content-Type", "application/json");

                                                            var raw = JSON.stringify({"user":JSON.parse(localStorage.getItem("usuario"))});

                                                            var requestOptions = {
                                                            method: 'POST',
                                                            headers: myHeaders,
                                                            body: raw,
                                                            redirect: 'follow'
                                                            };
                                                            if($(this).attr("data-favoritado")==0){
                                                                fetch("https://localhost/saory-api/api/produto/favoritar/"+$(this).attr("data-id"), requestOptions)
                                                                .then(response => response.text())
                                                                .then(result => {$(this).attr("data-favoritado",1)})
                                                                .catch(error => console.log('error', error));
                                                            }else{
                                                                fetch("https://localhost/saory-api/api/produto/desfavoritar/"+$(this).attr("data-id"), requestOptions)
                                                                .then(response => response.text())
                                                                .then(result => {$(this).attr("data-favoritado",0)})
                                                                .catch(error => console.log('error', error));
                                                            }
                                                            

                                                        }
                                                    }),
                                                    /**
                                                     * ****************************
                                                     *        COMPARTILHAR        *
                                                     * ****************************
                                                     */
                                                    $("<i/>",{"class":"fa fa-share-alt cat-share text-primary text-large m-auto",
                                                        click:function(){
                                                            //$(".compartilhar").show();
                                                            $(".catalogo").append(
                                                                $("<p/>",{"class":"block-compartilhar bg-primary h1 text-light text-center p-1"})
                                                                .append($("<i/>",{"class":"fab fa-whatsapp"})),
                                                                $("<p/>",{"class":"block-compartilhar-close bg-light", click:()=>$(".block-compartilhar, .block-compartilhar-close").remove()})
                                                            );
                                                            
                                                        }
                                                    }),
                                                    $("<i/>",{"class":"fa fa-cart-plus text-primary text-x-large cat-carrinho m-auto",
                                                        click:function(){
                                                            cesta.pre_add($(this).parents(".cat-produto").attr("id"));

                                                        }
                                                    })
                                                )  
                                        ),//fim de figure
                                    $("<div/>",{"class":"cat-prod-title text-primary text-truncate",
                                        click:function(e){
                                            produto.exibir($(this).parents(".cat-produto").attr("id"));
                                            $(".navbar").fadeOut("slow");
                                        }
                                    }).
                                            append(value.nome),
                                    $("<div/>",{"class":"cat-prod-descricao  text-truncate"}).
                                            append(value.descricao),
                                    $("<div/>",{"class":"cat-add-to-cart col-12 p-2"}).
                                        append(//btn auxiliar adicionar ao carrinho 
                                                $("<button>",{"class":"btn-add-to-cart btn btn-outline-primary col-12",
                                                                click:function(){
                                                                    let id = $(this).parents(".cat-produto").attr("id");
                                                                    $(".expo-block").attr("data-id",id);
                                                                    $(".expo-box-tamanho").fadeIn("slow");
                                                                    
                                                                }
                                                            }
                                                 ).
                                                 append(
                                                         $("<i/>",{"class":"fa fa-cart-plus"})
                                                        )
                                            ),
                                    //btn expande esconde
                                    $("<div/>",{"class":"btn-expand text-center col-12",
                                        click:function(){
                                            $(".btn-expand i").not($(this).children()).removeClass("fa-angle-up").addClass("fa-angle-down");
                                            $(this).children().toggleClass("fa-angle-up fa-angle-down");
                                            $(".cat-add-to-cart").
                                                not(
                                                    $(this).siblings(".cat-add-to-cart")
                                                ).hide("slow");
                                            $(".cat-prod-descricao").not($(this).siblings(".cat-prod-descricao")).addClass("text-truncate");//truca a descricao
                                            $(".cat-prod-title").not($(this).siblings(".cat-prod-title")).addClass("text-truncate");//truca o nome
                                            $(this).siblings(".cat-add-to-cart").toggle("slow");
                                            $(this).siblings().toggleClass("text-truncate");
                                            }
                                    }).append(
                                            $("<i>",{"class":"fa fa-angle-down"})
                                    )
                                );

                $(".catalogo").append(html);
                loadImg(value.img[0],"#img_block"+value.id+"_"+random,"prepend");
                
            }
        }//fim for
        $(".catalogo .spinner-grow").remove();
    },
    "getCatalog":function(numeroDoCatalogo){
        $(".btn-load-catalog").remove();
        let loading =$("<div/>", {class:"spinner-grow text-primary text-center m-auto loading-catalog", role:'status', style:"width:65px;hight:65px;"})
            .append($("<span/>",{class:"sr-only"}).append("Carregando..."))
        ;
        let btnLoadCatalog = $('<div/>', {"class":"col-12 text-center btn-load-catalog"})
                        .append($("<button/>", {
                            "class":"btn btn-primary",
                            click:()=>{
                                produto.getCatalog();
                            }
                        }).append('<i class="fas fa-redo-alt"></i>'))
        ;
        $(".catalogo").append(loading);//adiciona o carregando a pagina principal
        let myHeaders = new Headers();
        myHeaders.append("AppKey", APP_KEY);
        myHeaders.append("AppId", APP_ID);
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({"user":JSON.parse(localStorage.getItem("usuario"))});

        let requestOptions = {
        "method": "POST",
        "headers": myHeaders,
        "body": raw,
        "redirect": "follow"
        };
        fetch(URL_SERVER_BASE+"api/produto/lista/pagina/1", requestOptions)
            .then(respose=>{return respose.json()})
            .then(data=>{
                console.log(data)
                $(".loading-catalog").remove();//se carregou remove o carregando
                if(data.status=='success'){
                    produto.add(data.product);
                }else{
                    produto.Error(data.code,data.text);
                }
                $(".catalogo").append(btnLoadCatalog);
                app.numeroCatalogo = parseInt(app.numeroCatalogo+1);
            })
            .catch(e=>{
                console.error(e);
                $(".loading-catalog").remove();//se não carregou substitui o carregando
                alertar("Verifique sua conexão com a internet");
                $(".catalogo").append(btnLoadCatalog);
            });
        
        
    },
    "Error":function(cod, texto){
        alertar(texto+" - Codigo:"+cod);
    }
};
var cartaoDeCredito = {
    "nome":null,
    "bandeira":null,
    "numero":null,
    "vencimento":null,
    "verificador":null,
    "tipo":"credito"
};

var notificacao = {
    numRequisicao : 0,
    get: function(){
        app.chave = "getNotificacao";
        ws.send(JSON.stringify(app));
        notificacao.numRequisicao++;

    },
    retorno:(e)=>{
        let naoLida = 0;
        $.each(e, (index, value)=>{
            if(value.estado==0) naoLida++;
            let hora = value.data.splice(' ')[1];
            let dia = value.data.splice(' ')[0].splice('-')[2];
            let mes = value.data.splice(' ')[0].splice('-')[1];
            let ano = value.data.splice(' ')[0].splice('-')[0];
            let data = dia+'/'+mes+' '+hora;
            $(".notificacao-body").append(
                $("<tr/>").append(
                    '<td class="expo-lista-compra-img-item"><img src="https://localhost/loja_fer/app/controler/img_fornec.php?img=7" class="img-fluid expo-img-aux"></td><td class="text-primary">'+value.titulo+'<br><div class="col-12 small">'+value.menssagem+'<br></div><div class="text-xx-small col-12 text-right">'+data+'</div></td>'
                )
            );
        });
        if(naoLida!=0) $(".notificacao-numero").text(naoLida);
    },
    show:function(){
        pesquisa.hide()
        menu.hide();
        //$(".tela-notificacao").toggle();
        if($(".tela-notificacao").css('display')=='none' || $(".tela-notificacao").css('display')== 'NONE'){
            $(".tela-notificacao").fadeIn();
        }else{
            notificacao.hide()
        }
    },
    hide:()=>{
        $(".tela-notificacao").fadeOut();
        $(".notificacao-numero").text("");
    }
};
var pesquisa = {
    show:()=>{
        notificacao.hide();
        menu.hide();
        $(".tela-pesquisa").fadeIn();
    },
    hide:()=>{
        $(".tela-pesquisa").fadeOut();
    },
    "pesquisar":(txt)=>{
        txt = txt.trim().replace(/\s{2,}/g, ' ');
        if(txt == ""){
            $(".pesquisa-res").html("");
            return false;
        }
        var urlAlvo = URL_SERVER_BASE+"api/search/"+txt;
        $.get({
            url:urlAlvo,
            headers:headersApp
        }).done((result)=>{
            $(".pesquisa-res").html("");
            console.log(result);
            $.each(result,function(index, value){
                produto.todos[value.id] = value;
                let img = value.img;
                img = (img!='')?img.split(",")[0]:"8";
                console.log( (img.indexOf(",")) );
                let html = $("<tr/>",{"id":value.id,click:function(){produto.exibir($(this).attr("id"));$(".navbar").fadeOut("slow");}})
                    .append(
                        '<td class="expo-lista-compra-img-item"><img src="'+img+'" class="img-fluid expo-img-aux"></td><td class="text-primary">'+value.nome+'<br><small>'+value.descricao+'<br>R$'+value.preco_atual+'</small></td>'
                    );
                $(".pesquisa-res").append(html);
            });
        }).fail((result)=>{
            if(result.status!=200)
                alertar("parece tivemos um problema de conexão");
            else{
                alertar("Erro de aplicação");
            }
            console.log(result);
        });
    }
};


var tela = {
    name               :"",
    titulo             : "",
    voltar             : true,
    height             : 100,
    width              : 100,
    medidaHeight       : 'vh', //vh, px, % etc.
    medidaWidth        : 'vw',
    bg                 : '#f8f9fa',
    construir          : ()=>{
                            
                            if(!$('.tela-js').length){
                                let html = $("<div/>",{'class':'tela-js position-fixed z-index-7', 'style':'height:'+tela.height+tela.medidaHeight+'; width:'+tela.width+tela.medidaWidth+'; background-color:'+tela.bg+';'})
                                                .append($('<div/>',{'class':'chat-cabecalho tela-js-cabeca bg-primary col-12 p-3 text-light text-x-large text-center', 'style':"height:60px;"})
                                                            .append((tela.voltar) ? $('<i/>',{class:'fa fa-arrow-left text-x-large mr-2 bg-primary position-absolute', 'style':"left:10px;", click:()=>{tela.hide()}}) : '')
                                                            .append(tela.titulo))
                                ;
                                $('body').append(html);
                            }else{
                                $('.tela-js').css({'height':tela.height+tela.medidaHeight,'width': tela.width+tela.medidaWidth,'background-color':tela.bg});
                                $('.tela-js .tela-js-cabeca')
                                    .html('')
                                    .append((tela.voltar) ? $('<i/>',{class:'fa fa-arrow-left text-x-large mr-2 bg-primary position-absolute', 'style':"left:10px;", click:()=>{tela.hide()}}) : '')
                                    .append(tela.titulo)
                                ;
                            }
                        },
    append            :function(val){
                            if($('.tela-js > .painel').length){
                                $('.tela-js > .painel').append(val);
                            }else{
                                $('.tela-js').append($('<div/>',{class:'painel', 'style':'min-height:100%; min-width:100%;'}).append(val));
                            }
                        },
    limparPainel    : ()=>{
                            $('.tela-js > .painel').html("");
                        },
    hide          : function(){
                        $('.tela-js').hide('slow');
    },
    show : function(val){
        tela.construir();
        $('.tela-js').show('slow'); 

    }
};

