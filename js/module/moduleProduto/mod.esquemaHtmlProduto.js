import compartilharProduto from '../moduleProduto/mod.compartilhar.js';
import carrinho from '../moduleCarrinho/mod.carrinho.js';
import curtirProduto from '../moduleProduto/mod.curtir.js';

/**
 * Desenha o esquema que o produto é contruido na tela;
 * O objetivo de usar esta função é para padronizar e assim evitar reescrever esta função outras vezes 
 * para carregar produtos de categorias diferentes tipo: Curtidos, padrão, ou até alguma outra categoria que venha a surgir;
 * @param value {objeto contendo as info para construção do html geralmente vida do server e tratada com um for ou foreach se for o caso} 
 * @returns HTMLObject
 * @dependence Bootstrap, FontAwesome, Jquery, modules carrinho, compartilharProduto, curtirProduto
 */
export default function esquemaHtmlProduto(value){
        let random = Math.
            floor(
                Math.
                random() * 65536
        );
        var $btnCesta = $("<i/>",{
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
        });

        var $btnCompartilhar = $("<i/>",{   
            "class":"fa fa-share-alt cat-share text-primary text-large m-auto",
            click:function(){ compartilharProduto(this)}
        });

        var $btnCurtir =  $("<i/>",{
            "class":"fa fa-heart cat-curtir text-x-large z-index-6 text-primary m-auto",
            "data-id":value.id,
            "data-favoritado":value.favoritado,
            click:function(){curtirProduto($(this));}
        });

        var $divNome = $("<div/>",{
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
        append(value.nome);

        var $divDescricao = $("<div/>",{
            "class":"cat-prod-descricao  text-truncate"
        }).
        append(value.descricao);

        var $divAdd = $("<div/>",{
            "class":"cat-add-to-cart col-12 p-2"
        }).
        append(//btn auxiliar adicionar ao carrinho 
            $("<button>",{
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
            append($("<i/>",{
                "class":"fa fa-cart-plus"
            }))
        );

        var $divExpandeDescricao = $("<div/>",{"class":"btn-expand text-center col-12",
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
    append($("<i>",{
            "class":"fa fa-angle-down"
        })
    );

    return $("<div/>",{
        "class":"cat-produto col-12  mr-auto ml-auto col-md-2 mb-4 pt-3 z-index-2",
        "id":value.id,
    }).
    append(
        $("<figure/>",{
            "class":"cat-img-block text-center",
            id:"img_block"+value.id+"_"+random,
        })
        .append(
                $("<img/>",{"src":value.img[0], "class":"cat-img img-fluid bg-light z-index-5"}), //imagem do produto
                //pego apenas a primeira string do value.id
                $("<legend/>",{
                    "class":"cat-legend text-light col-12 bg-primary"
                }).
                append(()=>{
                    let Ordenado = value.tamanho;

                    return(
                        "R$ "+
                        Ordenado[
                            Object.
                            keys(Ordenado)[0]
                        ]
                        ["valor"]
                    );

                }),
                $("<div/>",{"class":"cat-social"}).
                append(
                $btnCurtir,
                $btnCompartilhar,
                $btnCesta
            )  
        ),//fim de figure
        $divNome ,
        $divDescricao,
        $divAdd,
        //btn expande esconde
        $divExpandeDescricao
    );
}

////////////////////////////////////////////////NEW FUNCTION//////////////////////////

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
    console.log(ObjTamanho);
    return ObjTamanho.sort(function(a,b){ 
    return(a[Object.keys(a)]["valor"] - b[Object.keys(b)]["valor"]);//compara valor a com valor b
    })
}