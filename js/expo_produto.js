const URL_SERVER_BASE = "https://localhost/saory-api/";
const PROJECT_URL_BASE = "https://localhost/saory-web/";
const Host ="localhost";
const Porta = "8080";
const APP_ID=1;
const APP_KEY = "abcd";
const headersApp = {
    "AppId":APP_ID,
    "AppKey":APP_KEY
};
var rolagem = {
    ultima:0,
    rolarPara:function(x=0,y=0){
        window.scrollBy(x,y);
    }
}
$(document).ready(function(){
    

    /**
     * ************TOUCH*****
     */
    $(".close-compartilhar").click(function(){
        $(".compartilhar").hide("slow");
    });
    
    var inicial;
    var final;
    Pslide = document.getElementById("slide");
    $("#slide").on('touchstart', function (e) {
        inicial = e.changedTouches [0] .pageX;
        //console.log(parseInt(inicial))
    });
    $("#slide").on("touchmove",function(e){
        let res = parseInt(inicial - e.changedTouches [0] .pageX);
        let principal = $("#slide .expo-slide-img-destaque .expo-img-pricipal");
        let proxima = $("#slide .expo-slide-img-aside img[src='"+principal.attr("src")+"']").next().attr("src");
        let anterior = $("#slide .expo-slide-img-aside img[src='"+principal.attr("src")+"']").prev().attr("src");
            
            
        if(res>50){//puxando sentido esquerda
            $(".next").css({"right":"100%"}).attr("src", proxima);
            if(proxima!=undefined){//verifica se não é a ultima
                $(".expo-img-pricipal").css({"left":parseInt(e.changedTouches [0] .pageX-inicial)});
            }
        }else if(res<-50){//puxando sentido direito
            $(".next").css({"right":"100%"}).attr("src", anterior);
            if(anterior!=undefined){//verifica se não é a ultima
                $(".expo-img-pricipal").css({"left":parseInt(e.changedTouches [0] .pageX-inicial)});
            }
        }
    });
    $("#slide").on('touchend', function (e) {
        final = e.changedTouches [0] .pageX;
        //console.log(parseInt(final))
        
        $(".expo-img-pricipal").css({"left":"0px"});
        let principal = $("#slide .expo-slide-img-destaque .expo-img-pricipal")
        $(".expo-slide-img-aside img").removeClass("selecionado")
        let proxima = $("#slide .expo-slide-img-aside img[src='"+principal.attr("src")+"']").next().attr("src")
        let anterior = $("#slide .expo-slide-img-aside img[src='"+principal.attr("src")+"']").prev().attr("src")
        let res = parseInt(inicial-final);
        
        if(res>50){
            principal.attr("src", proxima)
        }else if((inicial-final)==0){
            $(".expo-slide-img-aside, .expo-slide-img-close").fadeToggle();
            
        }else if(res<-50){
            principal.attr("src", anterior)
        }
        $("#slide .expo-slide-img-aside img[src='"+principal.attr("src")+"']").addClass("selecionado")

        } );
        let bodyInicio;
        let bodyFim;
        let catYInicial;
        let catYFinal;
        $("#catalogo, .expo-lista-compra").on("touchstart",function(e){
            bodyInicio = e.changedTouches[0].pageX;
            catYInicial = e.changedTouches[0].clientY;
            
        });
        $("#catalogo, .expo-lista-compra").on("touchmove",function(e){
             bodyFim = e.changedTouches[0].pageX;
             catYFinal = e.changedTouches[0].clientY;

             let res = parseInt(bodyInicio-bodyFim)
             let resY = parseInt(catYInicial-catYFinal);
             //console.log(resY);
             if(resY>50){
                $(".navbar").slideUp();
             }else if(resY<-50){
                $(".navbar").slideDown();
             }
             if(res>60 && (resY<50 && resY > -50)){
                cesta.show();
             }else if (res < -60 && (resY<6 && resY > -6)){
                 cesta.hide();
                 menu.show();
             }
             
        });
        
        $(".pesquisar").click(function(){
            pesquisa.show();
        });
        $(".parar-pesquisa").click(function(){
            pesquisa.hide();
        });
        $("#pesquisa").on({"keyup":function(){
            pesquisa.pesquisar($(this).val());
        }});
        $(".btn-nav").click(function(){
            menu.show();
        });
        $(".back-menu").click(function(){
            menu.hide();
        });
            /**
         * ***********************************
         *        CADASTRO DE USUARIO        *
         * ***********************************
         */


        $(".cad-user").click(function(){
            let nome  = $(".form-cadastro #nome").val();
            let email = $(".form-cadastro #email").val();
            let senha = $(".form-cadastro #senha").val();
            try{
                if(email=="" || senha=="" || nome==""){
                        throw "Todos os campos são obrigatorio";
                }
                app.userName = nome;
                app.userPass = senha;
                app.userEmail = email;
                app.chave = "cadastroUsuario";
                usuario.cadastro();
                
            }catch(err){
                alert(err);
            }
            
        });

        /**
         * ****************************
         *      FINALIZAR A COMPRA    *
         * ****************************
         */
        var cepOK = false;
        $("#e-cep").blur(function(){
            let cep = $(this).val().replace(/\D/g, '');
            if(cep != ""){
                let validacep = /^[0-9]{8}$/;
                if(validacep.test(cep)){
                    $("#e-uf").val("...");$("#e-cidade").val("...");$("#e-bairro").val("...");$("#e-rua").val("...");
                    $.getJSON("https://viacep.com.br/ws/"+cep+"/json/",function(dados){
                        if (!("erro" in dados)) {
                            cepOK = true;
                            $("#e-uf").val(dados.uf);$("#e-cidade").val(dados.localidade);$("#e-bairro").val(dados.bairro);$("#e-rua").val(dados.logradouro);
                        }else{
                            alertar("Cep não encontrado");
                            cepOK = false;
                            $("#e-uf").val("");$("#e-cidade").val("");$("#e-bairro").val("");$("#e-rua").val("");
                            $("#e-cep").focus().css({"color":"red"});
                        }
                    }).fail(function(e) {
                        alertar("Validação de CEP depende de internet");
                        $("#e-uf").val("");$("#e-cidade").val("");$("#e-bairro").val("");$("#e-rua").val("");
                        //$("#e-cep").focus();
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
            
        });
        $(".btn-pg-finalizar").click(function(){
            pagamento.efetuar();
            $(".tela-finalizar-pagamento").hide();
        });
        $("#pg-continuar").click(function(){
            let endereco = {"nome":$("#e-nome").val(),"cep":$("#e-cep").val(),"estado":$("#e-uf").val(),"cidade":$("#e-cidade").val(),"bairro":$("#e-bairro").val(),"rua":$("#e-rua").val(),"numero":$("#e-numero").val(),"opcional":$("#e-opcional").val(),"casaOuTrabalho":$("input[name='tc']:checked").val()};
            if(endereco.nome==undefined  || endereco.nome==null || endereco.nome=="" ||
                endereco.cep==undefined  || endereco.cep==null || endereco.cep=="" ||
                endereco.estado==undefined  || endereco.estado==null || endereco.estado=="" ||
                endereco.cidade==undefined  || endereco.cidade==null || endereco.cidade=="" ||
                endereco.bairro==undefined  || endereco.bairro==null || endereco.bairro=="" ||
                endereco.rua==undefined  || endereco.rua==null || endereco.rua=="" ||
                endereco.numero==undefined  || endereco.numero==null || endereco.numero=="" ||
                endereco.casaOuTrabalho==undefined  || endereco.casaOuTrabalho==null || endereco.casaOuTrabalho==""
            ){
                if(!(cepOK)){
                    alertar("Não foi possivel validar o CEP");
                    $("#e-cep").focus();
                }else{
                    alertar("Todos os campos são obrigatorio");
                }
                
                $("#pagamento").addClass("show");
                $("#pg-endereco").removeClass("show");
                
            }else if(!(cepOK)){
                alertar("Não foi possivel validar o CEP");
                $("#e-cep").focus();
                $("#pagamento").addClass("show");
                $("#pg-endereco").removeClass("show");
            }else{//Se tudo certo salvo o endereço
                if(localStorage.getItem("endereco")==null || localStorage.getItem("endereco")=="" || localStorage.getItem("endereco")== undefined){
                    localStorage.setItem("endereco",JSON.stringify(endereco));
                }else{
                    let enderecoSalvo = localStorage.getItem("endereco");
                    let enderecoASalvar = JSON.stringify(endereco);
                    localStorage.setItem("endereco",enderecoSalvo+","+enderecoASalvar);
                }
                
            }
        
        });

        $(".btn-f-compra").click(function(){
            let dataOBJForSend = {
                "user":JSON.parse(localStorage.getItem("usuario")),
            };
            if(cesta_de_compra.length!=0){
                //$(".tela-finalizar-pagamento").show().css({"top":"100%"}).animate({"top":"0%"},500);
                
                $.post(
                    {"url":URL_SERVER_BASE+"api/user/getaddress",
                    "Content-Type":"application/json",
                    "headers":headersApp,
                    "data":JSON.stringify(dataOBJForSend)
                }).done(function(data){
                    if(data.length>0){
                        escolherEndereco(data);
                    }else{
                        adicionarEndereco();
                    }
                    tela.show();
                }).fail(function(data){
                    adicionarEndereco();
                    console.error(data);
                    alertar("Você está sem conexão. Tente novamente")
                });
                
                
                
            }else{
                alertar("Sua cesta esta vazia");
            }
            
        });
        $(".back").click(function(){
            $(".tela-finalizar-pagamento").animate({"top":"100%"},500);
        });
        
    
    $(".expo-back").click(function(){
        inicio();
        window.scrollTo(rolagem.ultima,rolagem.ultima);
     });
     $(".expo-btn-add-to-cart").click(function(){
        cesta.pre_add($(this).attr("data-id"));
     });
     $(".btn-close-tamanho").click(()=>{
        $(".expo-box-tamanho").fadeOut("slow");
     });
     
     $(".expo-btn-finalizar").click(function(){
         let id = $(".expo-block").attr("data-id");
         let tamanho = $(".expo-tamanho-item").val();
         let quantidade = $(".expo-quantidade").val();
         try {
             if( isNaN(quantidade)) throw "Quantidade deve conter apenas numeros";
             if(tamanho==""|| quantidade=="") throw "Nenhum campo deve ficar vazio";
             if(quantidade<1) throw "Quantidade minima insuficiente";
             cesta.add(id, quantidade, tamanho);
             $(".expo-box-tamanho").fadeOut("slow");
         } catch (error) {
             alert(error);
         }
         
         
         
     });
     
     $(".expo-slide-img-close").click(function(){
         $(".expo-slide-img").hide("slow");
     });
     $(".expo-image-destaque").click(function(){
         slide.show($(".expo-block").attr("data-id"));
         console.log($(".expo-block").attr("data-id"));
     });
     $(".expo-img-aux").
             click(function(){
                 $(".expo-img-pricipal").
                         attr("src",$(this).
                         attr("src")
                 );
             });
             
     //Configuração de carrinho de compras 
     $(".btn-show-shoppingcart").click(function(){
         cesta.show();
     });
     $(".expo-ico-carrinho-hide").click(function(){
         cesta.hide();
     });
     $(".btn-notificacao").click(
         
         ()=>{
            notificacao.show();
            if(notificacao.numRequisicao==0){
                notificacao.get();
            }
        
         }
     );
     $(".inicio").click(()=>{
         menu.hide();
         pesquisa.hide();
         notificacao.hide();
         
     });
     
});//fim de window.ready