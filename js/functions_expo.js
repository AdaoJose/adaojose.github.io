
/**
 * Retorna um objeto html de carregamento padrão que é o spiner que vem do bootstrap 
 * @dependece bootstrap
 * @returns Html_Object loader
 */
function loaderHtml(){
    return $("<div/>",{
        "class":"loaderHtml spinner-border text-primary",
        "role":"status"
    })
    .append($("<span/>",{
            "class":"sr-only"
        })
        .append("Loading..."))
}
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
function abrirCesta(){
    console.log("[abrirCesta] inicializando...");
    cesta.show();
    console.log("[abrirCesta] finalizado...")
}

function confirmarEAdicionarACesta(confirmar){
    // carrinho.confirmar(confirmar)
    console.log(confirmar);
}
function loadImg(img, alvo="body", preOrApend='prepend', atributo = false){
        
        str = img.substring(0,10);
        
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
        }
        else if(str == "data:image"){
            //a imagem ja é blob
            console.log("é image");
            
            atributo = {
                "src":img, "class":"cat-img img-fluid bg-light z-index-5",
                "click":function(){
                    slide.show($(this).parents(".cat-produto").attr("id"));
                },
            };

            $(alvo).append($("<img/>",atributo));
            console.log($(alvo));

        }
        else{
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
                console.log($(alvo));
                
                
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

function alertar(msg = ""){
    console.
    log("[alertar] start ...");

    let timer = 
        msg.toString().
        split(' ').
        length
    ;//tempo para o fim da animação

    timer=(timer*605);//tempo aproximado que levamos para ler uma palavra
    timer=
        (timer<2000)?2000:timer
    ;
   
    let id = "alert"+(parseInt(Math.random()*100).toString());
    $("body").
    append(
            $("<div/>",{"id":id,"class":"position-fixed alert alert-primary col-12 z-index-max alertar text-center","style":"top:0px"}).
                        append(msg)
    );

    setTimeout(function(){
        $(".alertar").
        animate(
            {"opacity":0},
            500,
            "linear",
            function(){
                $("#"+id).remove();
            }
        );
    },
    timer)
    ;
    
    console.log("[alertar] finish ...");
}





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



