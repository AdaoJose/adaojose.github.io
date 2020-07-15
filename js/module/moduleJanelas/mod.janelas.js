/**
 * Esta função tem por objetivo criar a navegação baseada em janelas
 * com ela voce pode padronisar as janelas de sua aplicação vitando reescrita de codigos
 * Ex. let home = janelas(); let about = janelas(); let menuLateral = janelas();
 * assim voce terá uma janela para cada parte de sua aplicção que serão personalizaveis;
 * Ex. Ola mundo com janelas();
 * let home = janelas();
 * home.append("Ola mundo");
 * mais exemplos são encontrados na documentação
 */

export default function $jan(){
    let idJanela = 'JA'+parseInt(Math.random()*2000);
    let self = {
        name               :"",
        title             : "Janelas JS",
        btnBack             : true,
        height             : '100vh',
        width              : '100vw',
        bg                 : '#f8f9fa',
        bgHead             : '',
        id                 : idJanela,
        construct          : ()=>{
                                if(!$('#'+self.id).length){//verifico de esta janela ja foi constrida
                                    let html = $("<div/>",
                                        {
                                            'id':self.id,
                                            'name':self.name,
                                            'class':'janelas position-fixed z-index-7', 'style':'height:'+self.height+'; width:'+self.width+'; background-color:'+self.bg+';'
                                        }).
                                        append(
                                            $('<div/>',
                                                {'class':'chat-cabecalho cabecalho-janelas bg-primary col-12 p-3 text-light text-x-large text-center', 'style':"height:60px;"}
                                            ).
                                            append((self.btnBack) ? $('<i/>',{class:'fa fa-arrow-left text-x-large mr-2 bg-primary position-absolute', 'style':"left:10px;", click:()=>{self.hide()}}) : '').
                                            append($('<span/>',{'class':'titulo-janelas'}).
                                                append(self.title
                                            ))
                                        );
                                    $('body').append(html);
                                }else{
                                    $('#'+self.id).
                                    css({'height':self.height,'width': self.width,'background-color':self.bg});
                                    $('#'+self.id+' .cabecalho-janelas').
                                    html('').
                                    append(
                                        (self.btnBack) ? $('<i/>',{class:'fa fa-arrow-left text-x-large mr-2 bg-primary position-absolute', 'style':"left:10px;", click:()=>{self.hide()}}) : ''
                                    ).
                                    append(self.title)
                                    ;
                                }
                            },
        append            :function(val){
                                if($('#'+self.id+' > .painel').length){
                                    $('#'+self.id+' > .painel').append(val);
                                }else{
                                    $('#'+self.id).append($('<div/>',{class:'painel', 'style':'min-height:100%; min-width:100%;'}).append(val));
                                }
                            },
        clearPanel    : ()=>{
                                $('#'+self.id+' > .painel').html("");
                            },
        toolBArHide   :()=>{
                            $(".janelas#"+self.id+" > .cabecalho-janelas").hide()
        },
        /**
         * Com esta função você pode navegar na dom de sua janela e ainda 
         * aproveitar todos os recursos oferecidos pelo jquery
         * 
         * @param pamram - identificador css do elemento dentro da dom de sua janela
         * ex. dentro da sua janela tem um <button class="btn1">btn 1</button>
         * voce poderá seleciona-lo como se fosse com jquery. poderá fazer assim 
         * $minha_janela.dom(".btn1").click((){
         *  //instrução a ser executada
         * })
         */
        DOM            :(param='')=>{
            console.log(param);
            return $("#"+self.id+" > .painel > "+param);
        },
        /**
         * Função responsavel por minimisar a janela do aplicativo
         * se a janela estiver espandida esta minimizara imediatamente
         * @param param iguais a do jquery ex. slow que deixa mais suave o fechamento
         */
        hide          : function(param=''){
                            $('#'+self.id).hide(param);
        },
        /**
         * Função responsavel por exibir a janela do app
         * @param param iguais a do jquery ex. slow que deixa a abertura um pouco mais suave
         */
        show : function(param=''){
            if(!$('#'+self.id).length){//caso seja a primeira vez chame o construct
                self.construct();
            }
            $('#'+self.id).show(param); 
    
        },
        /** 
         * Para Realizar edição no cabeçalho janela;
         * ao chamar o metodo o cabeçalho padrão é retirado.
         * @param paramHTML: recebe todo squema html que será colocado no lugar do cabecalho.
         * caso vazio o cabecalho ficará vazio tambem.
         * @returns janela
        */
        setHead       :(paramHTML='')=>{
            $(".cabecalho-janelas").html("").html(paramHTML);
            return self;
        },
        setTitle     :(paramTitulo)=>{
            $("#"+self.id+" > .cabecalho-janelas > .titulo-janelas").html(paramTitulo);
        },
        setHeight     :(paramAltura)=>{
            $('#'+self.id).
            css({
                height:paramAltura
            });
        },
        setWidth      :(paramLargura)=>{
            $('#'+self.id).
            css({
                width:paramLargura
            });
        },
        setBgPanel    :()=>{
            $("#"+self.id+" > .painel").css()
        }
    }
    //garante que ao inicializar as tags html ja seja adicionadas ao corpo do documanto.
    self.construct();
    // garante que a tela inicialise minimizada
    $("#"+self.id).hide();
    // retorna o obejeto
    return (self);
}

