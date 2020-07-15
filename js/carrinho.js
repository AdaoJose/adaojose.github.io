/*
 *  Este é o documento responsável por agregar todos os métodos de configuração do carrinho
 */

var cart = [];
//tipo = 1=='camisa'||'blusa' || 'jaqueta', 2=='calça', 3=='shorte' 4=='sapato' 100=='eletronicos'

var carrinho = {
    add:function (idProduto,tamanho, tipo)
    {//Esta é a função responssavel por adicionar um item ao carrinho.
        console.log("[carrinho.add] inicializando..");
        let carrinho = {"ola":"tudo bem"};
        if((idProduto!=null && idProduto!=undefined)&&
            (tamanho!=null && tamanho!=undefined) && 
            (tipo!=null && tipo!=undefined) 
        ){
            cart.push({"id":idProduto,"tamanho":tamanho,"categoria":tipo});
            return(true);
        }else{
            return(false);
        }
        console.log("[carrinho.add] filizando..");
    },
    lista:function(){
        return(cart);
    },
    remove:function(id){
        if(id!=undefined && id != null){
            return(true);
        }else{
            return(false);
        }
    }
    
}


