<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>JSDoc: Source: mod.carregarCurtidos.js</title>

    <script src="scripts/prettify/prettify.js"> </script>
    <script src="scripts/prettify/lang-css.js"> </script>
    <!--[if lt IE 9]>
      <script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
    <link type="text/css" rel="stylesheet" href="styles/prettify-tomorrow.css">
    <link type="text/css" rel="stylesheet" href="styles/jsdoc-default.css">
</head>

<body>

<div id="main">

    <h1 class="page-title">Source: mod.carregarCurtidos.js</h1>

    



    
    <section>
        <article>
            <pre class="prettyprint source linenums"><code>import compartilharProduto from '../moduleProduto/mod.compartilhar.js';
import carrinho from '../moduleCarrinho/mod.carrinho.js';
import curtirProduto from '../moduleProduto/mod.curtir.js';
/**
 * Por padrão quando os produtos veem do web-service chegam sem seguir uma ordem especifica
 * ésta função tem o objetivo de ajudar a padronizar a organização dos objetos por valor.
 * simplificaando a exibição dos preços dos produtos do menor para o maior, tornando assim mais 
 * interessante a visualização dos produtos pelo usuario final 
 * acompanhe os exemplos para mais informações
 * @author Adão José
 * @param {'Object'} ObjTamanho 
 * @returns Objeto Ordenado por menor valor
 * @example
 * var a = 
 * [
 *  {"G":{"valor":"150.1","cor_quantidade":{"preto":25,"branco":30,"vermelho":15}}},
 *  {"GG":{"valor":"30","cor_quantidade":{"preto":25,"branco":30,"vermelho":15}}},
 *  {"M":{"valor":"100","cor_quantidade":{"preto":25,"branco":30,"vermelho":15}}},
 *  {"P":{"valor":"50","cor_quantidade":{"preto":25,"branco":30,"amarelo":15}}}
 * ];
 * console.log(fnOrdenarTamanhoPorValor(a));
 * //return
 * [
 *  {"GG":
 *      {"valor":"30","cor_quantidade":{"preto":25,"branco":30,"vermelho":15}}
 *  },
 *  {"P":
 *      {"valor":"50","cor_quantidade":{"preto":25,"branco":30,"amarelo":15}}
 *  },
 *  {"M":
 *      {"valor":"100","cor_quantidade":{"preto":25,"branco":30,"vermelho":15}}
 *  },
 *  {"G":
 *      {"valor":"150.1","cor_quantidade":{"preto":25,"branco":30,"vermelho":15}}
 *  }
 * ]
 */ 

function fnOrdenarTamanhoPorValor(ObjTamanho){
    return ObjTamanho.sort(function(a,b){ 
    return(a[Object.keys(a)]["valor"] - b[Object.keys(b)]["valor"]);//compara valor a com valor b
    })
}

export default function carregarCurtidos(produtos){
    //console.log(produtos);
    tela.limparPainel();

    for(var [key, value] of Object.entries(produtos)){//correndo o Json retorno 
        cosole.log(value);
        if(produtos.length>0){
            produto.todos[value.id] = value;
            /**construindo o html */
            let random = Math.floor(Math.random() * 65536);
            let html = 
                $("&lt;div/>",{
                    "class":"cat-produto col-12  mr-auto ml-auto col-md-2 mb-4 pt-3 z-index-2",
                    "id":value.codigo,
                }).
                append(
                    $("&lt;figure/>",{
                        "class":"cat-img-block text-center",
                        id:"img_block"+value.codigo+"_"+random,
                    })
                    .append(
                            //pego apenas a primeira string do value.codigo
                            $("&lt;legend/>",{
                                "class":"cat-legend text-light col-12 bg-primary"
                            }).
                            append(()=>{
                                let Ordenado = fnOrdenarTamanhoPorValor(value.tamanho);

                                return(
                                    "R$ "+
                                    Ordenado[0]
                                    [
                                        Object.
                                        keys(Ordenado[0])
                                    ]
                                    ["valor"]
                                );

                            }),
                            $("&lt;div/>",{"class":"cat-social"}).
                            append(
                                $("&lt;i/>",{
                                    "class":"fa fa-heart cat-curtir text-x-large z-index-6 text-primary m-auto",
                                    "data-id":value.id,
                                    "data-favoritado":value.favoritado,
                                    click:function(){curtirProduto($(this));}
                                }),
                            /**
                             * ****************************
                             *        COMPARTILHAR        *
                             * ****************************
                             */
                            $("&lt;i/>",{"class":"fa fa-share-alt cat-share text-primary text-large m-auto",
                                click:function(){ compartilharProduto(this)}
                            }),
                            $("&lt;i/>",{
                                "class":"fa fa-cart-plus text-primary text-x-large cat-carrinho m-auto",
                                "data-nome":value.nome,
                                "data-descricao":value.descricao,
                                "data-categoria":value.categoria,
                                "data-tamanho-valor":JSON.stringify(value.tamanho),
                                "data-id":value.id,
                                "data-custo-envio":value.valor_frete,
                                //"data-estoque":value.estoque,
                                "data-img":value.img,
                                "data-nota":value.nota,
                                "data-tot-avaliacao":value.numero_avaliacao,
                                click:function(){carrinho.add(this);}
                            })
                        )  
                    ),//fim de figure
                    $("&lt;div/>",{
                        "class":"cat-prod-title text-primary text-truncate",
                        click:function(e){
                            produto.
                            exibir($(this).
                            parents(".cat-produto").
                            attr("id"));

                            $(".navbar").
                            fadeOut("slow");
                        }
                    }).
                    append(value.nome),
                    $("&lt;div/>",{
                        "class":"cat-prod-descricao  text-truncate"
                    }).
                    append(value.descricao),
                    $("&lt;div/>",{
                        "class":"cat-add-to-cart col-12 p-2"
                    }).
                    append(//btn auxiliar adicionar ao carrinho 
                        $("&lt;button>",{
                            "class":"btn-add-to-cart btn btn-outline-primary col-12",
                            "data-nome":value.nome,
                            "data-descricao":value.descricao,
                            "data-categoria":value.categoria,
                            "data-tamanho-valor":JSON.stringify(value.tamanho),
                            "data-id":value.id,
                            "data-custo-envio":value.valor_frete,
                            //"data-estoque":value.estoque,
                            "data-img":value.img,
                            "data-nota":value.nota,
                            "data-tot-avaliacao":value.numero_avaliacao,
                            click:function(){carrinho.add(this);}
                        }).
                        append($("&lt;i/>",{
                            "class":"fa fa-cart-plus"
                        }))
                    ),
                    //btn expande esconde
                    $("&lt;div/>",{"class":"btn-expand text-center col-12",
                        click:function(){
                            $(".btn-expand i").
                            not($(this).
                            children()).
                            removeClass("fa-angle-up").
                            addClass("fa-angle-down");

                            $(this).children().
                            toggleClass("fa-angle-up fa-angle-down");
                            
                            $(".cat-add-to-cart").
                            not($(this).
                                siblings(".cat-add-to-cart")
                            ).
                            hide("slow");

                            $(".cat-prod-descricao").
                            not($(this).
                            siblings(".cat-prod-descricao")).
                            addClass("text-truncate");//truca a descricao

                            $(".cat-prod-title").
                            not($(this).
                            siblings(".cat-prod-title")).
                            addClass("text-truncate");//truca o nome

                            $(this).
                            siblings(".cat-add-to-cart").
                            toggle("slow");

                            $(this).
                            siblings().
                            toggleClass("text-truncate");

                        }//fim click:
                    }).
                    append($("&lt;i>",{
                            "class":"fa fa-angle-down"
                        })
                    )
                );

            tela.append(html);
            loadImg(value.img[0],"#img_block"+value.codigo+"_"+random,"prepend");
            
        }
    }
}</code></pre>
        </article>
    </section>




</div>

<nav>
    <h2><a href="index.html">Home</a></h2><h3>Global</h3><ul><li><a href="global.html#fnOrdenarTamanhoPorValor">fnOrdenarTamanhoPorValor</a></li></ul>
</nav>

<br class="clear">

<footer>
    Documentation generated by <a href="https://github.com/jsdoc/jsdoc">JSDoc 3.6.3</a> on Wed Mar 25 2020 20:17:56 GMT-0400 (GMT-04:00)
</footer>

<script> prettyPrint(); </script>
<script src="scripts/linenumber.js"> </script>
</body>
</html>
