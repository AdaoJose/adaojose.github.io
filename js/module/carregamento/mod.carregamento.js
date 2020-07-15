
import $spiner from "../moduleBootstrapModal/spiner.js";

/**
 * Carregamento: function js de animação enquanto a pagina carrega
 * @param OBJECT de configuração para inicialização
 * @returns OBJECT com toda as propriedades de controle da animação
 * 
 */
export default function carregamento($objConf = {}){
        var $text = $objConf.hasOwnProperty('text') ? $objConf.text : "Carregando";
        var id  = parseInt(Math.random()*100)+"-carregamento";
        var $divCarregamento  = 
        $("<div/>",{
            "id":id,
            style:
                "display:block; position:absolute; top:0px; height:100vh; width:100vw; background-color: rgba(255,255,255,0.5); z-index:2001;"+
                "align-items: center;"+
                "display: flex;"+
                "flex-direction: row;"+
                "flex-wrap: wrap;"+
                "justify-content: center;"
        }).
        append($spiner());

        $("body").
        append($divCarregamento);
        
        $($divCarregamento).
        hide();

        function show(){
            $($divCarregamento).
            show();
        }

        function hide(){
            $($divCarregamento).
            hide(); 
        }
        console.log("carregamento iniciando");
        return {
            show,
            hide
        }
}