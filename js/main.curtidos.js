
<<<<<<< HEAD
    import usuario from "./module/moduleUsuario/mod.usuario.js";
    import config from "./config.js";
    import $jan from './module/moduleJanelas/mod.janelas.js';
    import carregarProdutos from './module/moduleProduto/mod.produto.js';
    import cesta from './module/moduleCarrinho/mod.cestaFront.js';
=======
    import $jan from './module/moduleJanelas/mod.janelas.js';
    import carregarProdutos from './module/moduleProduto/mod.produto.js';
    import cesta from './module/moduleCarrinho/mod.cestaFront.js';
    import config from "./config.js";
>>>>>>> cdac72819cd0eee892270f03a1be632413e875c4
    import $spiner from './module/moduleBootstrapModal/spiner.js';
    
    const $conf = config();
    const $loader = $spiner();
<<<<<<< HEAD
    
    //verifico se usuario esta logado
    usuario().logado().then(()=>{


        
        $(".expo-ico-carrinho-show").
        click(()=>{
            cesta().show();//cesta de compras itera com o visual abrir, fechar ... para mostrar produtos ao usuario
        });

        
        
        var home_janela = $jan();
        home_janela.name = "home_janela";
        home_janela.show();
        home_janela.setHead(
        '<nav class=" z-index-5 position-fixed navbar navbar-principal navbar-lg-expand navbar-light col-12 border" style="height: 60px;"><i class="text-x-large fa fa-bars notificacao  text-light btn-nav"></i><i class="text-x-large fa fa-home notificacao  text-light inicio"></i><i class="text-x-large fa fa-search text-light notificacao ml-5 mr-n-5 pesquisar"></i><i class="text-x-large fa fa-bell btn-notificacao notificacao text-light"><span class="badge badge-primary text-xx-small notificacao-numero"></span></i><i class="text-x-large fa fa-shopping-cart text-light notificacao btn-show-shoppingcart mr-2" onclick="abrirCesta()"></i></nav>'
        );
        home_janela.
        append(
            $loader//spiner giratorio antes do carregamento
        );
        $("#"+home_janela.id+" > .painel").addClass("centralizar-filhos-VeO");
        function carregarProd(pagination){
            $(".btn-load-more-prod").remove(); 

            carregarProdutos(pagination).
            then(response=>{
            response.
            forEach(home_janela.append);
            
            let $btnCarregarProduto = $("<button/>",{
                class:" col-12 btn btn-outline-primary btn-load-more-prod",
                click:()=>carregarProd(pagination+1)
            }).append("Ver mais");
            
            home_janela.append($btnCarregarProduto);
            //response == array com os htmls dos produtos
            //foreach percorre array e adiciona em home_janela
            
                //concluido
                $($loader).
                remove();
                $("#"+home_janela.id+" > .painel").removeClass("centralizar-filhos-VeO");
                
            }).
            catch(error=>{
            setTimeout((error)=>{
                home_janela.clearPanel();
                home_janela.append("Falha ao carregar pagina");
                console.error("[erro]");
                
            },2000);
            console.error(error);
            });

            
        }
        
        carregarProd(1);
        //home_janela.toolBArHide();
    



        
    }).catch(()=>{
        window.location.href = $conf.loginPage();
    });
=======
    console.log("[Main curtidos] start");
      
      
    $(".expo-ico-carrinho-show").
    click(()=>{
    console.log("[.expo-ico-carrinho-show] clicado...", "Chamando [cesta.show]....");
    cesta().show();//cesta de compras itera com o visual abrir, fechar ... para mostrar produtos ao usuario
    });

    
    
    var home_janela = $jan();
    home_janela.name = "home_janela";
    home_janela.show();
    home_janela.setHead(
    '<nav class=" z-index-5 position-fixed navbar navbar-principal navbar-lg-expand navbar-light col-12 border" style="height: 60px;"><i class="text-x-large fa fa-bars notificacao  text-light btn-nav"></i><i class="text-x-large fa fa-home notificacao  text-light inicio"></i><i class="text-x-large fa fa-search text-light notificacao ml-5 mr-n-5 pesquisar"></i><i class="text-x-large fa fa-bell btn-notificacao notificacao text-light"><span class="badge badge-primary text-xx-small notificacao-numero"></span></i><i class="text-x-large fa fa-shopping-cart text-light notificacao btn-show-shoppingcart mr-2" onclick="abrirCesta()"></i></nav>'
    );
    home_janela.
    append(
        $loader//spiner giratorio antes do carregamento
    );
    $("#"+home_janela.id+" > .painel").addClass("centralizar-filhos-VeO");
    function carregarProd(pagination){
        $(".btn-load-more-prod").remove(); 

        carregarProdutos(pagination).
        then(response=>{
        response.
        forEach(home_janela.append);
        
        let $btnCarregarProduto = $("<button/>",{
            class:" col-12 btn btn-outline-primary btn-load-more-prod",
            click:()=>carregarProd(pagination+1)
        }).append("Ver mais");
        console.log($btnCarregarProduto);
        home_janela.append($btnCarregarProduto);
        //response == array com os htmls dos produtos
        //foreach percorre array e adiciona em home_janela
        
            //concluido
            $($loader).
            remove();
            $("#"+home_janela.id+" > .painel").removeClass("centralizar-filhos-VeO");
            console.log(home_janela.DOM("#1").click(()=>{
            
            }));
        }).
        catch(error=>{
        setTimeout((error)=>{
            home_janela.clearPanel();
            home_janela.append("Falha ao carregar pagina");
            console.log("[erro]");
            //console.log(error);
        },2000)
        console.log(error)
        });

        
    }
    
    carregarProd(1);
    //home_janela.toolBArHide();
  



    
>>>>>>> cdac72819cd0eee892270f03a1be632413e875c4
