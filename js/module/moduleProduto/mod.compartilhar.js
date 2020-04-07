export default function compartilharProduto(self){
    self = $(self);
    //$(".compartilhar").show();
    $(".catalogo").append(
        $("<p/>",{"class":"block-compartilhar bg-primary h1 text-light text-center p-1"})
        .append($("<i/>",{"class":"fab fa-whatsapp"})),
        $("<p/>",{"class":"block-compartilhar-close bg-light", 
        click:()=>$(".block-compartilhar, .block-compartilhar-close").remove()})
    );
}