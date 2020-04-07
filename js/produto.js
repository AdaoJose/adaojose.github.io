//depende do jquery

function addProduto(id_prod, nome_prod, preco_atual_prod, preco_ant_prod,desc_prod,data_cad_prod,url_prod_prod,src_img_prod){
               
    var html =  $("<div/>",
                 {
                     class:"col-6 mb-3 col-md-3 h-50 m-auto body-prod",
                     style:"z-index:9"
                     
                 })
                 .append(
                     $("<img/>",{
                        src:src_img_prod,
                        class:"img-fluid img-prod",
                        "id-prod":id_prod,
                        alt:"nome do produto",
                        click:
                            function(){
                                $(".bloc-img-aux")
                                    .html(" ");
                                $(".painel-expo")
                                    .show("slow");
                                let obj = 
                                    img_prod[$(this)
                                        .attr("id-prod")
                                    ];
                                $(".img-princ")
                                    .attr("src",$(this).attr("src"));
                                for (var key in obj) {
                                    //console.log(obj[key]);
                                    $(".bloc-img-aux")
                                        .append(
                                            $("<img/>",
                                            {
                                                src:"http://"+wsEndereco+"/loja_fer/app/controler/img_fornec.php?img="+obj[key],
                                                class:"img-fluid h-25 m-auto img-aux",
                                                click:function(){
                                                    $(".img-aux").not(this).each(
                                                        function(){
                                                            $(this)
                                                            .css("opacity",0.50)
                                                            .removeClass("border");
                                                        }
                                                    );
                                                    $(".img-princ")
                                                        .attr("src",$(this).attr("src"));
                                                    $(this)
                                                        .css("opacity",0.90)
                                                        .addClass("border");
                                                }
                                            }));
                                }
                            }
                 }),$("<div/>",{
                     class:"col-desc"
                 })
                 .append(
                    $("<span/>",/*Inicio de coluna de preco*/
                     {
                          class:"preco-prod",
                          onload:function(){
                            $(this).hide();
                        }
                     })
                     .append($("<span/>",
                     {
                          class:"preco-prod-ant text-muted"
                     })
                     .append(preco_ant_prod),$("<span/>",{
                         class:"preco-prod-atual"
                     }).append("&nbsp;"+preco_atual_prod)),/*fim de coluna de preco*/
                     $("<span/>",
                 {
                     class:"nome-prod text-primary hide-nome-prod"
                 })
                 .append(nome_prod),
                     $("<span>",
                     {
                         class:"desc-prod text-muted hide-desc-prod"
                     })
                     .append(desc_prod),
                        $("<span/>",{
                         class:"Add-to-cart col-12",
                         onload:function(){
                             $(this).hide();
                         }
                     })
                     .append($("<button/>",{
                         class:"btn btn-add-to-cart btn-primary col-10"
                     })
                     .append("Adicionar",$("<i/>",{
                         class:"fas fa-cart-plus"
                     }))),$("<span/>",{
                          class:"expand border-top bg-secondary",
                          click:function(){
                             var  self =  this;
                             $(".preco-prod,.Add-to-cart,.fa-chevron-down")
                                .each(function(i){
                                    $(this)
                                        .not(".fa-chevron-down")
                                        .not($(self).parent(".col-desc").children("span,.Add-to-cart").not(".nome-prod, .desc-prod, .expand"))
                                        .hide("slow");
                                    $(this)
                                        .not($(self).children(".fa-chevron-down"))
                                        .removeClass("fa-chevron-up");
                                    // alert(i);
                                    $(this)
                                        .parent(".col-desc")
                                        .children(".nome-prod, .desc-prod")
                                        .not($(self).parent(".col-desc").children(".nome-prod, .desc-prod"))    
                                        .addClass("hide-nome-prod hide-desc-prod");
                                });
                             $(self)
                                .parent(".col-desc")
                                .children("span,.Add-to-cart")
                                .not(".nome-prod, .desc-prod, .expand")
                                .toggle("slow");
                             $(self)
                                 .parent(".col-desc")
                                 .children(".nome-prod, .desc-prod")
                                 .toggleClass("hide-nome-prod hide-desc-prod");
                             
                                
                             $(self)
                                .children(".fa-chevron-down")
                                .toggleClass("fa-chevron-up");
                              
                          }
                      }).append($("<i/>",{
                          class:"fas fa-chevron-down m-auto text-light"
                      }))));
$(".corpo").append(html);
}