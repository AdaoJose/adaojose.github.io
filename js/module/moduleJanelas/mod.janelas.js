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

export default function janelas(){
    let idJanela = 'JA'+parseInt(Math.random()*2000);
    let self = {
        name               :"",
        titulo             : "",
        voltar             : true,
        height             : 100,
        width              : 100,
        medidaHeight       : 'vh', //vh, px, % etc.
        medidaWidth        : 'vw',
        bg                 : '#f8f9fa',
        bgHead             : '',
        id                 : idJanela,
        construir          : ()=>{
                                if(!$('#'+self.id).length){//verifico de esta janela ja foi constrida
                                    let html = $("<div/>",
                                        {
                                            'id':self.id,
                                            'name':self.name,
                                            'class':'janelas position-fixed z-index-7', 'style':'height:'+self.height+self.medidaHeight+'; width:'+self.width+self.medidaWidth+'; background-color:'+self.bg+';'
                                        }).
                                        append(
                                            $('<div/>',
                                                {'class':'chat-cabecalho cabecalho-janelas bg-primary col-12 p-3 text-light text-x-large text-center', 'style':"height:60px;"}
                                            ).
                                            append((self.voltar) ? $('<i/>',{class:'fa fa-arrow-left text-x-large mr-2 bg-primary position-absolute', 'style':"left:10px;", click:()=>{self.hide()}}) : '').
                                            append($('<span/>',{'class':'titulo-janelas'}).
                                                append(self.titulo
                                            ))
                                        );
                                    $('body').append(html);
                                }else{
                                    $('#'+self.id).
                                    css({'height':self.height+self.medidaHeight,'width': self.width+self.medidaWidth,'background-color':self.bg});
                                    $('#'+self.id+' .cabecalho-janelas').
                                    html('').
                                    append(
                                        (self.voltar) ? $('<i/>',{class:'fa fa-arrow-left text-x-large mr-2 bg-primary position-absolute', 'style':"left:10px;", click:()=>{self.hide()}}) : ''
                                    ).
                                    append(self.titulo)
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
        limparPainel    : ()=>{
                                $('#'+self.id+' > .painel').html("");
                            },
        hide          : function(){
                            $('#'+self.id).hide('slow');
        },
        show : function(val){
            if(!$('#'+self.id).length){//caso seja a primeira vez chame o construct
                self.construir();
            }
            $('#'+self.id).show('slow'); 
    
        },
        /** 
         * Para Realizar edição no cabeçalho janela;
         * ao chamar o metodo o cabeçalho padrão é retirado.
         * @param paramHTML: recebe todo squema html que será colocado no lugar do cabecalho.
         * caso vazio o cabecalho ficará vazio tambem.
         * @returns janela
        */
        editeHead       :(paramHTML='')=>{
            $(".cabecalho-janelas").html("").html(paramHTML);
            return self;
        },
        editeTitulo     :(paramTitulo)=>{
            $("#"+self.id+" > .cabecalho-janelas > .titulo-janelas").html(paramTitulo);
        },
        editeHeight     :(paramAltura)=>{
            $('#'+self.id).
            css({
                height:paramAltura
            });
        },
        editeWidth      :(paramLargura)=>{
            $('#'+self.id).
            css({
                width:paramLargura
            });
        }
    }
    return (self);
}