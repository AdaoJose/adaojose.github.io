const wsEndereco= "localhost";
//Depende do jquery
var img_prod = [];
var ws = function(){
    var con = new WebSocket("ws://"+wsEndereco+":8080");//abre a conexão
    var estadoDeConecao = false; //define qual o estado da conexao false quer diser desconectado
    con.onopen=function(){
        getCatalog();
        this.estadoDeConecao = true;
    }
    con.onerror= function(err){
        console.log("não foi possivel conectar ao servidor");
        this.estadoDeConecao = false;
    }
    
    con.onclose = function(){
        alert("Conexão fexada");
        this.estadoDeConecao = false;
    }
    con.onmessage = function(msg){
        var ob = JSON.parse(msg.data);
console.log(ob);
// var arr[];

for(var [key, value] of Object.entries(ob)){
if(key==0){
    for(var [key1, value1] of Object.entries(ob[key])){
        //console.log("percorrendo obj na posição 0");
        //console.log(key1+"->"+ value1);
        //console.log("fim de obj na posição 0 ");
        if(key1=="metodo"){//retorno tipo de metodo
            switch(value1){//aqui vejo qual metodo sera executado
                case "getCatalog":
                    //console.log("OB[1] é igual: ")
                    console.log(ob[1]);
                    for(var [key2, value2] of Object.entries(ob[1])){//ob na posição 1 traserá o catalogo de produtos
                        //console.log("----------Catalogo de produtos----------");
                        //console.log(key2+"->"+value2.nome);
                        //console.log("----------fim de catalogo de produto----------");
                        if(value2.id_img!==null){//se o produto ja tiver imagem
                            
                            img_prod[value2.id] = value2.id_img.split(",");
                        }
                        else{//se o produto ainda não tem imagem
                            img_prod[value2.id] = ["8"];//define a imagem padão do sistema
                        }
                        let img_perfil_prod = "http://"+wsEndereco+"/loja_fer/app/controler/img_fornec.php?img="+img_prod[value2.id][0];
                        addProduto(value2.id,value2.nome,value2.preco_atual,value2.preco_anterior,value2.descricao,value2.data_cad,value2.url_produto,img_perfil_prod);
                        
                    }
                    //console.log(img_prod);
                ;
            }
            
        }
    }
}
// console.log(key+"->"+ value);
}

    }
    this.send = function(chave,metodo){
        con.send(JSON.stringify({chave:metodo}));
    }
    
}